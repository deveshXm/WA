import styled from "styled-components";

export const TableWrapper = styled.div`
  height: calc(100vh - 200px);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;

export const TableHeader = styled.div`
  overflow-x: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const TableBody = styled.div`
  flex: 1;
  overflow: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const TableHeaderRow = styled.tr`
  background-color: #f5f5f5;
`;

export const TableHeaderCell = styled.th<{ width: string }>`
  padding: 20px 15px;
  text-align: left;
  font-weight: 700;
  font-size: medium;
  border-bottom: 1px solid #e0e0e0;
  &:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }
`;

export const TableRow = styled.tr``;

export const TableCell = styled.td<{ width: string }>`
  padding: 20px 15px;
  width: ${(props) => props.width};
  border-bottom: 1px solid #e0e0e0;

  &:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }
`;

export const CustomCell = styled.div<{ customStyle?: string }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: medium;
  ${(props) => props.customStyle}
`;

export const PaginationContainer = styled.div`
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
