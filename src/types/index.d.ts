declare global {
  type TableRow = Record<string, CellData>;

  type FilterOptions = Reacord<string, string[]>;

  type FilterValue = string | [Date | null, Date | null] | null;

  interface TableHeader {
    key: string;
    label: string;
    type: "string" | "number" | "date";
    filter: boolean;
  }

  interface TableData {
    headers: TableHeader[];
    rows: TableRow[];
    filterOptions: FilterOptions;
    totalCount: number;
  }

  interface CellData {
    value: string | number;
    style?: string;
  }

  interface TableProps {
    data: TableData;
    loading: boolean;
    error: string | null;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  }

  interface FilterBarProps {
    headers: TableHeader[];
    filterOptions: FilterOptions;
    onFilterChange: (filters: FilterCriteria) => void;
  }

  interface DateRangePickerProps {
    header: TableHeader;
    dateRange: [Date | null, Date | null];
    handleDateChange: (update: [Date | null, Date | null]) => void;
  }

  interface NewInspectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (inspection: TableRow) => void;
    headers: TableHeader[];
  }

  interface FetchParams {
    page: number;
    pageSize: number;
    filters: FilterCriteria;
  }

  interface TableData {
    headers: TableHeader[];
    rows: TableRow[];
    filterOptions: FilterOptions;
    totalCount: number;
  }

  interface FetchParams {
    page: number;
    pageSize: number;
    filters: FilterCriteria;
  }

  interface FilterCriteria {
    [key: string]: string | Date | [Date | null, Date | null] | null;
  }
}

export {};
