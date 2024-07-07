import DateRange from "react-datepicker";

export interface TableHeader {
  key: string;
  label: string;
  type: "string" | "number" | "date";
  filter: boolean;
  overflow?: boolean;
}

export interface TableData {
  headers: TableHeader[];
  rows: Record<string, unknown>[];
  filterOptions: Record<string, string[]>;
  totalCount: number;
}

export interface FilterBarProps {
  headers: TableHeader[];
  filterOptions: Record<string, string[]>;
  onFilterChange: (filters: FilterCriteria) => void;
}

export interface TableProps {
  data: TableData;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export interface NewInspectionModalProps {
  onClose: () => void;
  onSubmit: (inspection: Record<string, unknown>) => void;
  headers: TableHeader[];
}

export interface FilterCriteria {
  [key: string]: string | DateRange | null;
}

export interface FetchParams {
  page: number;
  pageSize: number;
  filters: FilterCriteria;
}

export interface TableData {
  headers: TableHeader[];
  rows: Record<string, unknown>[];
  filterOptions: Record<string, string[]>;
  totalCount: number;
}
