import { atom } from "jotai";

type SelectedFilters = {
  tourType: string[];
  itinerary: string[];
  [key: string]: string[];
};

export const selectedFiltersAtom = atom<SelectedFilters>({
  tourType: [],
  itinerary: [],
});
