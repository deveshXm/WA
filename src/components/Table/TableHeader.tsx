import React from "react";
import { StyledTable, TableHeaderRow, TableHeaderCell } from "./styles";

interface TableHeaderProps {
  headers: TableHeader[];
  columnWidths: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers, columnWidths }) => (
  <StyledTable>
    <colgroup>
      {columnWidths.map((width, index) => (
        <col key={index} style={{ width }} />
      ))}
    </colgroup>
    <thead>
      <TableHeaderRow>
        {headers.map((header, index) => (
          <TableHeaderCell key={header.key} width={columnWidths[index]}>
            {header.label}
          </TableHeaderCell>
        ))}
      </TableHeaderRow>
    </thead>
  </StyledTable>
);

export default TableHeader;
