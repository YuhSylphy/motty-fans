export type Sex = "male" | "female" | "unknown";

export type HorseDef = {
  name: string;
  fatherName?: string;
  motherName?: string;
  sex: Sex;
};

export const fetchHorseDefs = (): Promise<HorseDef[]> =>
  fetch(`${process.env.PUBLIC_URL}/assets/horse-defs.json`).then((res) =>
    res.json()
  );
