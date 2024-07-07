import { useState, useEffect, useCallback } from "react";
import { TableData, FilterCriteria } from "../types";
import { fetchTableData, createInspection } from "../services/api";

export const useInspections = () => {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterCriteria>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTableData({ page, pageSize, filters: appliedFilters });
      setTableData(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  }, [page, pageSize, appliedFilters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateFilters = (newFilters: FilterCriteria) => {
    setAppliedFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const addInspection = async (newInspection: Record<string, unknown>) => {
    try {
      await createInspection(newInspection);
      loadData(); // Reload data to include the new inspection
    } catch (err) {
      setError("Failed to create inspection");
    }
  };

  return {
    tableData,
    appliedFilters,
    loading,
    error,
    updateFilters,
    addInspection,
    page,
    pageSize,
    setPage,
    setPageSize,
  };
};
