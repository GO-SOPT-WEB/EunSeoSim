import { atom } from "recoil";

export const levelState = atom<string>({
  key: "levelState",
  default: "easy",
});
