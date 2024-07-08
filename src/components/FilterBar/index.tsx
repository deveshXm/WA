import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../common/Select";
import { FilterContainer } from "./styles";
import DateRangePicker from "./DateRangePicker";

const FilterBar: React.FC<FilterBarProps> = ({ headers, filterOptions, onFilterChange }) => {
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleFilterChange = (key: string, value: string | [Date | null, Date | null] | null) => {
    const newFilters: FilterCriteria = { ...filters, [key]: value };
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
          return <DateRangePicker header={header} dateRange={dateRange} handleDateChange={handleDateChange} />;
        }

        if (filterOptions[header.key]) {
          return (
            <Select key={header.key} onChange={(e) => handleFilterChange(header.key, e.target.value)}>
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
      })}
    </FilterContainer>
  );
};

export default FilterBar;
