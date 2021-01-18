import { of } from "rxjs";
import { mergeAll, mergeMap, toArray } from "rxjs/operators";

export type Sex = "male" | "female" | "unknown";

export type Line =
  | "Uk" // 不明(指定なし)
  | "Ec" // エクリプス系
  | "Ph" // ファラリス系
  | "Ns" // ナスルーラ系
  | "Ro" // ロイヤルチャージャー系
  | "Ne" // ニアークティック系
  | "Na" // ネイティヴダンサー系
  | "Fa" // フェアウェイ系
  | "To" // トムフール系
  | "Te" // テディ系
  | "Sw" // スインフォード系
  | "Ha" // ハンプトン系
  | "Hi" // ヒムヤー系
  | "St" // セントサイモン系
  | "Ma" // マッチェム系
  | "He"; // ヘロド系

export const lineMap: { [key in Line]: { label: string } } = {
  Uk: { label: "不明(指定なし)" },
  Ec: { label: "エクリプス" },
  Ph: { label: "ファラリス" },
  Ns: { label: "ナスルーラ" },
  Ro: { label: "ロイヤルチャージャー" },
  Ne: { label: "ニアークティック" },
  Na: { label: "ネイティヴダンサー" },
  Fa: { label: "フェアウェイ" },
  To: { label: "トムフール" },
  Te: { label: "テディ" },
  Sw: { label: "スインフォード" },
  Ha: { label: "ハンプトン" },
  Hi: { label: "ヒムヤー" },
  St: { label: "セントサイモン" },
  Ma: { label: "マッチェム" },
  He: { label: "ヘロド" },
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

const fetchOwned =
  // 所有馬
  (): Promise<HorseDef[]> =>
    fetch(`${process.env.PUBLIC_URL}/assets/horse-defs.json`)
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

const fetchStallion =
  // 種牡馬
  (): Promise<HorseDef[]> =>
    fetch(`${process.env.PUBLIC_URL}/assets/stallion-defs.json`)
      .then((res) => res.json())
      .then((data: HorseDef[]) =>
        data.map((def) => ({
          ...def,
          sex: "male",
          owned: false,
          memo: def.memo ?? [],
        }))
      );

const fetchBroodmare =
  // 繁殖牝馬
  (): Promise<HorseDef[]> =>
    fetch(`${process.env.PUBLIC_URL}/assets/broodmare-defs.json`)
      .then((res) => res.json())
      .then((data: HorseDef[]) =>
        data.map((def) => ({
          ...def,
          sex: "female",
          owned: false,
          memo: def.memo ?? [],
        }))
      );

export const fetchHorseDefs = (): Promise<HorseDef[]> =>
  of(fetchOwned, fetchStallion, fetchBroodmare)
    .pipe(
      mergeMap((func) => func()),
      mergeAll(),
      toArray()
    )
    .toPromise();
