import { FilterCode } from "../types/email";

export const FILTERS = [
  {
    id: "1",
    name: "Unread",
    code: FilterCode.UNRD,
    isSelected: false,
  },
  {
    id: "2",
    name: "Read",
    code:  FilterCode.RD,
    isSelected: false,
  },
  {
    id: "3",
    name: "Favorites",
    code: FilterCode.FAV,
    isSelected: false,
  },
];
