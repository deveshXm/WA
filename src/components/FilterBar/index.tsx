import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { FilterBarProps, FilterCriteria } from "../../types";
import "react-datepicker/dist/react-datepicker.css";

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 4px;
`;

const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 3;
`;

const FilterBar: React.FC<FilterBarProps> = ({ headers, filterOptions, onFilterChange }) => {
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleFilterChange = (key: string, value: string | [Date | null, Date | null] | null) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    handleFilterChange("createdAt", update);
  };

  return (
    <FilterContainer>
      {headers.map((header) => {
        if (!header.filter) return null;

        if (header.type === "date") {
          return (
            <DateRangeContainer key={header.key}>
              <DatePicker
                selectsRange={true}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={handleDateChange}
                isClearable={true}
                placeholderText="Select date range"
                dateFormat="yyyy-MM-dd"
              />
            </DateRangeContainer>
          );
        }

        if (filterOptions[header.key]) {
          return (
            <Select key={header.key} onChange={(e) => handleFilterChange(header.key, e.target.value)}>
              <option value="">All {header.label}</option>
              {filterOptions[header.key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          );
        }

        return null;
      })}
    </FilterContainer>
  );
};

export default FilterBar;
