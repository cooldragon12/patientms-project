// index file for list component
import SelectionTable from "./selection_table";
import { LinkedSelectionTable } from "./linkedtable";
import { RegularTable, useStyles } from "./table";

export { SelectionTable, LinkedSelectionTable, RegularTable, useStyles };


export interface ITableProps<T> {
    data: T[];
    columns: any[];
    empty_message?: string;
    selection: [];
    setSelection: (selection: any[]) => void;
    sortBy: string;
    ascending: boolean;
    sortHandler: (sortBy: string, ascending: boolean) => void;
    content: React.FC<{ data: T }>;
}