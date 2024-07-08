import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  border-radius: 4px;
`;

export const FilterItem = styled.div`
  flex: 1 1 180px;
  min-width: 180px;
  max-width: calc(33.333% - 10px);

  > * {
    width: 100%;
  }
`;
