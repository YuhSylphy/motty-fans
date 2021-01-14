export type Sex = "male" | "female" | "unknown";

export type HorseDef = {
  name: string;
  fatherName?: string;
  motherName?: string;
  sex: Sex;
};
