import React from "react";
import { PaginationContainer } from "./styles";
import Button from "../common/Button";
import Select from "../common/Select";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageSize, totalPages, onPageChange, onPageSizeChange }) => (
  <PaginationContainer>
    <div>
      <Button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Previous
      </Button>
      <span>
        {" "}
        Page {page} of {totalPages}{" "}
      </span>
      <Button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        Next
      </Button>
    </div>
    <div>
      Rows per page: &nbsp;
      <Select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </Select>
    </div>
  </PaginationContainer>
);

export default Pagination;
