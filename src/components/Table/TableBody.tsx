import React from "react";
import { StyledTable, TableRow, TableCell, CustomCell } from "./styles";

interface TableBodyProps {
  headers: TableHeader[];
  rows: Record<string, CellData>[];
  columnWidths: string[];
}

const TableBody: React.FC<TableBodyProps> = ({ headers, rows, columnWidths }) => (
  <StyledTable>
    <colgroup>
      {columnWidths.map((width, index) => (
        <col key={index} style={{ width }} />
      ))}
    </colgroup>
    <tbody>
      {rows.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {headers.map((header, index) => {
            const cellData = row[header.key] as CellData;
            return (
              <TableCell key={header.key} width={columnWidths[index]}>
                <CustomCell customStyle={cellData.style}>{String(cellData.value) ?? ""}</CustomCell>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </tbody>
  </StyledTable>
);

export default TableBody;
