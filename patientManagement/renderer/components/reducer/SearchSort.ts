/**
 * @file SearchSort.ts
 * @returns {
 * data:list, filteredData:list, searchQuery:string, sortBy:string, ascending:boolean, itemsPerPage:number, currentPage:number
 *
 * }
 */
export interface SearchSortState<T> {
 data: T[];
 filteredData: T[];
 searchQuery: string | null;
 sortBy: keyof T;
 ascending: boolean;
 itemsPerPage: number;
 currentPage: number;
}
/**
 * Dispatch Action for the SearchSortReducer
 * @param type - The type of action to perform
 * @param payload - The data to use for the action
 *
 */
export interface SearchSortAction<T> {
 type: "LOAD" | "SEARCH" | "SORT" | "PAGINATE";
 payload?: {
  data?: T[];
  filteredData?: T[];
  searchQuery?: string;
  key?: keyof T;
  ascending?: boolean;
  itemsPerPage?: number;
  currentPage?: number;
 };
}

const searchSortReducer = <T>(
 state: SearchSortState<T>,
 action: SearchSortAction<T>
): SearchSortState<T> => {
 switch (action.type) {
  case "LOAD":
   const data = action.payload?.data ?? [];
   const filteredData = data.slice().sort((a, b) => {
    const compare = a[state.sortBy] > b[state.sortBy] ? 1 : -1;
    return state.ascending ? compare : -compare;
   });
   return {
    ...state,
    data: data,
    filteredData: filteredData,
   };
  case "SEARCH":
   const searchQuery = action.payload?.searchQuery ?? "";
   const filteredResults = state.data.slice().filter((item) => {
    const values = Object.values(item).join(" ").toLowerCase();
    return values.includes(searchQuery.toLowerCase());
   });
   const sortedResults = filteredResults.slice().sort((a, b) => {
    const compare = a[state.sortBy] > b[state.sortBy] ? 1 : -1;
    return state.ascending ? compare : -compare;
   });
   return {
    ...state,
    searchQuery: searchQuery,
    filteredData: sortedResults,
   };
  case "SORT":
   const key = action.payload?.key ?? state.sortBy;
   const ascending = action.payload?.ascending ?? !state.ascending;
   const sortedData = state.filteredData.slice().sort((a, b) => {
    const compare = a[key] > b[key] ? 1 : -1;
    return ascending ? compare : -compare;
   });
   return {
    ...state,
    filteredData: sortedData,
    sortBy: key,
    ascending: ascending,
   };
  case "PAGINATE":
    const itemsPerPage = action.payload?.itemsPerPage ?? state.itemsPerPage;
    const currentPage = action.payload?.currentPage ?? state.currentPage;
    return {
      ...state,
      itemsPerPage: itemsPerPage,
      currentPage: currentPage,
    }
  default:
   return state;
 }
};

export default searchSortReducer;
