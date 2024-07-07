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

export interface FetchParams {
  page: number;
  pageSize: number;
  filters: FilterCriteria;
}

// Add this new interface
export interface CellData {
  value: string | number | Date;
  style?: string;
}

// Update the TableData interface
export interface TableData {
  headers: TableHeader[];
  rows: Record<string, CellData | unknown>[];
  filterOptions: Record<string, string[]>;
  totalCount: number;
}

// Update FetchParams interface if needed
export interface FetchParams {
  page: number;
  pageSize: number;
  filters: FilterCriteria;
}

// Update FilterCriteria if needed
export interface FilterCriteria {
  [key: string]: string | Date | [Date | null, Date | null] | null;
}
