import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { TableProps } from "../../types";

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 400px);
  min-height: 600px;
  position: relative;
`;

const TableHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  background-color: #f2f2f2;
  z-index: 2;
`;

const TableBody = styled.div`
  position: absolute;
  top: 40px; // Adjust this value based on your header height
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const TableHeaderCell = styled.th<{ width: string }>`
  padding: 10px;
  text-align: left;
  white-space: nowrap;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableCell = styled.td<{ overflow: boolean; width: string }>`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  width: ${(props) => props.width};
  ${(props) =>
    props.overflow &&
    `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

const PaginationContainer = styled.div`
  position: absolute;
  bottom: -60px; // Adjust this value as needed
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid #ddd;
`;

const PageSizeSelector = styled.select`
  margin-left: 10px;
`;

const NoDataMessage = styled.div`
  text-align: center;
`;

const Table: React.FC<TableProps> = ({ data, loading, error, page, pageSize, onPageChange, onPageSizeChange }) => {
  const [headerWidths, setHeaderWidths] = useState<string[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      const widths = data.headers.map((header) => {
        const maxContentLength = Math.max(header.label.length, ...data.rows.map((row) => String(row[header.key]).length));
        return `${Math.min(Math.max(maxContentLength * 8, 100), 300)}px`;
      });
      setHeaderWidths(widths);
    }
  }, [data]);

  useEffect(() => {
    const syncScroll = () => {
      if (headerRef.current && bodyRef.current) {
        headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
      }
    };

    if (bodyRef.current) {
      bodyRef.current.addEventListener("scroll", syncScroll);
    }

    return () => {
      if (bodyRef.current) {
        bodyRef.current.removeEventListener("scroll", syncScroll);
      }
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <TableWrapper>
      <TableHeader ref={headerRef}>
        <StyledTable>
          <thead>
            <tr>
              {data.headers.map((header, index) => (
                <TableHeaderCell key={header.key} width={headerWidths[index]}>
                  {header.label}
                </TableHeaderCell>
              ))}
            </tr>
          </thead>
        </StyledTable>
      </TableHeader>
      <TableBody ref={bodyRef}>
        <StyledTable>
          {data.rows.length ? (
            <tbody>
              {data.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {data.headers.map((header, index) => (
                    <TableCell key={header.key} overflow={!!header.overflow} width={headerWidths[index]}>
                      {row[header.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </tbody>
          ) : (
            <NoDataMessage>No Data Found.</NoDataMessage>
          )}
        </StyledTable>
      </TableBody>
      <PaginationContainer>
        <div>
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            {" "}
            Page {page} of {totalPages}{" "}
          </span>
          <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
        <div>
          Rows per page:
          <PageSizeSelector value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </PageSizeSelector>
        </div>
      </PaginationContainer>
    </TableWrapper>
  );
};

export default Table;
