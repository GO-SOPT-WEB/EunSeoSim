import { atom } from "recoil";

export const scoreState = atom<number>({
  key: "scoreState",
  default: 0,
});
