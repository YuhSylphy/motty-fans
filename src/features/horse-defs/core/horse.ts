export type Sex = "male" | "female" | "unknown";

export type System =
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

export type HorseDef = {
  name: string;
  fatherName?: string;
  motherName?: string;
  sex: Sex;
  system: System;
};

export const fetchHorseDefs = (): Promise<HorseDef[]> =>
  fetch(`${process.env.PUBLIC_URL}/assets/horse-defs.json`)
    .then((res) => res.json())
    .then((data: (HorseDef & { removed?: boolean })[]) =>
      data.filter((def) => !def.removed)
    );
