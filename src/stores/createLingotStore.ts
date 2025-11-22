import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LingotSlice = {
  lingots: number;
  increaseLingots: (by: number) => void;
  decreaseLingots: (by: number) => void;
};

export const createLingotSlice: BoundStateCreator<LingotSlice> = (set) => ({
  lingots: 0,
  increaseLingots: (by: number) =>
    set(({ lingots }) => ({ lingots: lingots + by })),
  decreaseLingots: (by: number) =>
    set(({ lingots }) => ({ lingots: Math.max(0, lingots - by) })),
});
