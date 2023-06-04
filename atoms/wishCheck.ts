import { atom } from "jotai";

export const isHeartFilledAtom = atom<boolean[]>([]);

export const heartCountAtom = atom(get => {
  const isHeartFilled = get(isHeartFilledAtom);
  return isHeartFilled.filter(Boolean).length;
});
