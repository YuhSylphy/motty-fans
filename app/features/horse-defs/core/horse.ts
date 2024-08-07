import { firstValueFrom, of } from 'rxjs';
import {
	groupBy,
	mergeAll,
	mergeMap,
	toArray,
	reduce,
	tap,
} from 'rxjs/operators';

export type Sex = 'male' | 'female' | 'unknown';

export type Line =
	| 'Uk' // 不明(指定なし)
	| 'Ec' // エクリプス系
	| 'Ph' // ファラリス系
	| 'Ns' // ナスルーラ系
	| 'Ro' // ロイヤルチャージャー系
	| 'Ne' // ニアークティック系
	| 'Na' // ネイティヴダンサー系
	| 'Fa' // フェアウェイ系
	| 'To' // トムフール系
	| 'Te' // テディ系
	| 'Sw' // スインフォード系
	| 'Ha' // ハンプトン系
	| 'Hi' // ヒムヤー系
	| 'St' // セントサイモン系
	| 'Ma' // マッチェム系
	| 'He'; // ヘロド系

export const lineMap: { [key in Line]: { label: string } } = {
	Uk: { label: '不明(指定なし)' },
	Ec: { label: 'エクリプス' },
	Ph: { label: 'ファラリス' },
	Ns: { label: 'ナスルーラ' },
	Ro: { label: 'ロイヤルチャージャー' },
	Ne: { label: 'ニアークティック' },
	Na: { label: 'ネイティヴダンサー' },
	Fa: { label: 'フェアウェイ' },
	To: { label: 'トムフール' },
	Te: { label: 'テディ' },
	Sw: { label: 'スインフォード' },
	Ha: { label: 'ハンプトン' },
	Hi: { label: 'ヒムヤー' },
	St: { label: 'セントサイモン' },
	Ma: { label: 'マッチェム' },
	He: { label: 'ヘロド' },
};

export type HorseDef = {
	/** 名称: ID代わり */
	name: string;
	/** 父親名 */
	fatherName?: string;
	/** 母親名 */
	motherName?: string;
	/** 性別 */
	sex: Sex;
	/** 系統 */
	line: Line;
	/** 種牡馬/繁殖牝馬一覧に載っているか */
	listed: boolean;
	/** 所有馬 */
	owned: boolean;
	/** 表示すべきか */
	show: boolean;
	/** メモ */
	memo: string[];
};

type AnscestorHorse = {
	name?: string;
	father?: AnscestorHorse;
	mother?: AnscestorHorse;
	line?: Line;
};
interface ListedAnscestor extends AnscestorHorse {
	name: Exclude<AnscestorHorse['name'], undefined>;
	father: Exclude<AnscestorHorse['father'], undefined>;
	mother: Exclude<AnscestorHorse['mother'], undefined>;
}

/**
 * 種牡馬・繁殖牝馬リストを競走馬一覧にflattenして返す
 * @param def
 * @param param1
 */
const flatten = (
	def: AnscestorHorse,
	{ sex, listed, childName }: { sex: Sex; listed?: boolean; childName: string }
): HorseDef[] => {
	const name =
		def.name ??
		`${childName}${sex === 'female' ? '母' : sex === 'male' ? '父' : '親'}`;
	const show = def.name !== void 0;

	const fathers = def.father
		? flatten(def.father, { sex: 'male', childName: name })
		: [];
	const mothers = def.mother
		? flatten(def.mother, { sex: 'female', childName: name })
		: [];
	const line = def.line ?? fathers?.[0]?.line ?? 'Uk';

	const target: HorseDef = {
		name,
		line,
		listed: !!listed,
		owned: false,
		show,
		fatherName: fathers?.[0]?.name,
		motherName: mothers?.[0]?.name,
		memo: [],
		sex,
	};

	return [target, fathers, mothers].flat();
};

const fetchOwned =
	// 所有馬
	(): Promise<HorseDef[]> =>
		fetch(`${import.meta.env.BASE_URL}/assets/horse-defs.json`)
			.then((res) => res.json())
			.then((data: (HorseDef & { removed?: boolean })[]) =>
				data
					.filter((def) => !def.removed)
					.map((def) => ({
						...def,
						listed: !!def.listed,
						owned: true,
						show: true,
						memo: def.memo ?? [],
					}))
			);

/**
 * 繁殖牝馬リスト
 */
const fetchBroodmare = (): Promise<HorseDef[]> =>
	fetch(`${import.meta.env.BASE_URL}/assets/broodmares.json`)
		.then((res) => res.json())
		.then((data: ListedAnscestor[]) =>
			data
				.map((def) =>
					flatten(def, { sex: 'female', listed: true, childName: 'N/A' })
				)
				.flat()
		);

/**
 * 種牡馬リスト
 */
const fetchStallion = (): Promise<HorseDef[]> =>
	fetch(`${import.meta.env.BASE_URL}/assets/stallions.json`)
		.then((res) => res.json())
		.then((data: ListedAnscestor[]) =>
			data
				.map((def) =>
					flatten(def, { sex: 'male', listed: true, childName: 'N/A' })
				)
				.flat()
		);

/**
 * 競走馬の定義を取得してマージする
 */
export const fetchHorseDefs = (): Promise<HorseDef[]> =>
	firstValueFrom(
		of(fetchOwned, fetchStallion, fetchBroodmare).pipe(
			mergeMap((func) => func()),
			mergeAll(),
			groupBy((def) => def.name),
			mergeMap((group) =>
				group.pipe(
					reduce((lhs, rhs) => ({
						name: lhs.name ?? rhs.name,
						sex: lhs.sex ?? rhs.sex,
						listed: lhs.listed || rhs.listed,
						show: lhs.show || rhs.show,
						owned: lhs.owned || rhs.owned,
						line: lhs.line === 'Uk' ? rhs.line : lhs.line,
						memo: [...lhs.memo, ...rhs.memo],
						fatherName: lhs.fatherName ?? rhs.fatherName,
						motherName: lhs.motherName ?? rhs.motherName,
					}))
				)
			),
			toArray(),
			tap((defs) => {
				const m = new Map<string, HorseDef>(defs.map((def) => [def.name, def]));

				/** lineがUnknownのものを父親の情報から保完する */
				const complementLine = (def: HorseDef) => {
					// 対応不要
					if (def.line && def.line !== 'Uk') {
						return;
					}

					// 父親が後ろにいるかも知れないので先に再帰しておく
					if (def.fatherName) {
						const father = m.get(def.fatherName);
						if (father) {
							complementLine(father);
						} else {
							console.warn(
								`${def.fatherName}: father of ${def.name} doesnt exist in list`,
								def,
								m
							);
						}
					}

					// それでも未確定ならUkに設定
					def.line = m.get(def.fatherName || '')?.line ?? 'Uk';

					if (def.line === 'Uk') {
						console.warn(`couldnt determine line of ${def.name}`);
					}
				};
				defs.forEach(complementLine);
			})
		)
	);
