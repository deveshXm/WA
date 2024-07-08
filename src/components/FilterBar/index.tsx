import React, { useState, useCallback } from "react";

import Select from "../common/Select";
import DateRangePicker from "./DateRangePicker";
import { FilterContainer, FilterItem } from "./styles";

const FilterBar: React.FC<FilterBarProps> = ({ headers, filterOptions, onFilterChange }) => {
  const [filters, setFilters] = useState<FilterCriteria>({});

  const handleFilterChange = useCallback(
    (key: string, value: FilterValue) => {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters, [key]: value };
        onFilterChange(newFilters);
        return newFilters;
      });
    },
    [onFilterChange]
  );

  const renderFilter = useCallback(
    (header: TableHeader) => {
      if (header.type === "date") {
        return (
          <DateRangePicker
            header={header}
            dateRange={(filters[header.key] as [Date | null, Date | null]) || [null, null]}
            handleDateChange={(update) => handleFilterChange(header.key, update)}
          />
        );
      }

      if (filterOptions[header.key]) {
        return (
          <Select onChange={(e) => handleFilterChange(header.key, e.target.value)}>
            <option value="">All {header.label}</option>
            {filterOptions[header.key].map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        );
      }

      return null;
    },
    [filterOptions, filters, handleFilterChange]
  );

  return <FilterContainer>{headers.map((header) => (header.filter ? <FilterItem key={header.key}>{renderFilter(header)}</FilterItem> : null))}</FilterContainer>;
};

export default React.memo(FilterBar);
