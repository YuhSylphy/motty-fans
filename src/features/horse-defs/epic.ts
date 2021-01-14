import { Epic, combineEpics } from "redux-observable";
import { map } from "rxjs/operators";

import { horseDefsActions, HorseDefsAction } from ".";
import { HorseDef } from "./core/horse";

export const fetchDefsEpic: Epic<HorseDefsAction> = (action$) =>
  action$.ofType(horseDefsActions.init.type).pipe(
    map((_) => {
      // 最終的にはfetchする
      return horseDefsActions.set({ list: dummyDefs });
    })
  );

export const epic = combineEpics(fetchDefsEpic);

const dummyDefs: HorseDef[] = [
  { name: "ロズウェルリポート", sex: "female" },
  {
    name: "モッティサイキョウ",
    sex: "male",
    fatherName: "パイロ",
    motherName: "ロズウェルリポート",
  },
  {
    name: "ステキマリオクン",
    sex: "male",
    fatherName: "ゴールドアリュール",
    motherName: "ロズウェルリポート",
  },
  {
    name: "ゴマプリン",
    sex: "female",
    fatherName: "ジョーカプチーノ",
    motherName: "ロズウェルリポート",
  },
  {
    name: "ミタラシダンゴ",
    sex: "female",
    fatherName: "ネオユニヴァース",
    motherName: "ロズウェルリポート",
  },
  {
    name: "カントリーマアム",
    sex: "female",
    fatherName: "マンハッタンカフェ",
    motherName: "ロズウェルリポート",
  },
  {
    name: "ルマンド",
    sex: "female",
    fatherName: "ダイワメジャー",
    motherName: "ロズウェルリポート",
  },
  {
    name: "モリナガノコエダ",
    sex: "female",
    fatherName: "ジョーカプチーノ",
    motherName: "ロズウェルリポート",
  },
  {
    name: "コーヒーゼリィ",
    sex: "male",
    fatherName: "ジョーカプチーノ",
    motherName: "ロズウェルリポート",
  },
  {
    name: "スウィートポテト",
    sex: "female",
    fatherName: "エンパイアメーカー",
    motherName: "ゴマプリン",
  },
  {
    name: "ムギチャ",
    sex: "female",
    fatherName: "ジョーカプチーノ",
    motherName: "ロズウェルリポート",
  },
  {
    name: "オレノオレオクッキ",
    sex: "male",
    fatherName: "ゴールドシップ",
    motherName: "ゴマプリン",
  },
  {
    name: "ペコチャン",
    sex: "female",
    fatherName: "ルーラーシップ",
    motherName: "カントリーマアム",
  },
  {
    name: "ピノ",
    sex: "female",
    fatherName: "アグネスデジタル",
    motherName: "ゴマプリン",
  },
  {
    name: "カブキアゲ",
    sex: "male",
    fatherName: "オルフェーブル",
    motherName: "カントリーマアム",
  },
];
