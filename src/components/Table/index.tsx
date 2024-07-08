import React, { useState, useEffect, useRef } from "react";
import { TableWrapper, TableHeader as StyledTableHeader, TableBody as StyledTableBody } from "./styles";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

const calculateColumnWidths = (data: TableData): string[] => {
  return data.headers.map((header) => {
    const maxContentLength = Math.max(header.label.length, ...data.rows.map((row) => String((row[header.key] as CellData).value).length));
    return `${Math.min(Math.max(maxContentLength * 10, 100), 300)}px`;
  });
};

const Table: React.FC<TableProps> = ({ data, loading, error, page, pageSize, onPageChange, onPageSizeChange }) => {
  const [columnWidths, setColumnWidths] = useState<string[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      const widths = calculateColumnWidths(data);
      setColumnWidths(widths);
    }
  }, [data]);

  useEffect(() => {
    const headerElement = headerRef.current;
    const bodyElement = bodyRef.current;

    if (!headerElement || !bodyElement) return;

    const syncScroll = () => {
      headerElement.scrollLeft = bodyElement.scrollLeft;
    };

    bodyElement.addEventListener("scroll", syncScroll);

    return () => {
      bodyElement.removeEventListener("scroll", syncScroll);
    };
  }, [data]); // Re-run the effect when data changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <TableWrapper>
      <StyledTableHeader ref={headerRef}>
        <TableHeader headers={data.headers} columnWidths={columnWidths} />
      </StyledTableHeader>
      <StyledTableBody ref={bodyRef}>
        <TableBody headers={data.headers} rows={data.rows} columnWidths={columnWidths} />
      </StyledTableBody>
      <Pagination page={page} pageSize={pageSize} totalPages={totalPages} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />
    </TableWrapper>
  );
};

export default Table;
