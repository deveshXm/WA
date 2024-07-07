import { TableData, FetchParams } from "../types";
import { isWithinInterval } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import data from "../data.ts";

export const fetchTableData = async (params: FetchParams): Promise<TableData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { page, pageSize, filters } = params;
  const filteredData = data.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === null || value === "") return true;
      if (key === "createdAt" && Array.isArray(value)) {
        const [start, end] = value;
        if (start && end) {
          const rowDate = new Date(row[key]);
          return isWithinInterval(rowDate, { start, end });
        }
        return true;
      }
      return row[key as keyof typeof row] === value;
    });
  });

  // Calculate pagination
  const totalCount = filteredData.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    headers: [
      { key: "inspectionStatus", label: "Inspection Status", type: "string", filter: true, overflow: true },
      { key: "inspectionId", label: "Inspection ID", type: "string", filter: false, overflow: true },
      { key: "lotStatusVerdict", label: "Lot Status/Verdict", type: "string", filter: true, overflow: true },
      { key: "icPartName", label: "IC Part Name", type: "string", filter: true, overflow: true },
      { key: "supplierName", label: "Supplier Name", type: "string", filter: true, overflow: true },
      { key: "totalOrderQuantity", label: "Total Order Quantity", type: "number", filter: false },
      { key: "samplingSize", label: "Sampling Size", type: "number", filter: false },
      { key: "totalOK", label: "Total OK", type: "number", filter: false },
      { key: "totalNOK", label: "Total NOK", type: "number", filter: false },
      { key: "createdAt", label: "Created At", type: "date", filter: true, overflow: false },
    ],
    rows: paginatedData,
    filterOptions: {
      inspectionStatus: ["OPEN", "ONGOING", "SUBMITTED"],
      lotStatusVerdict: ["PENDING", "IN_PROGRESS", "APPROVED", "REJECTED"],
      icPartName: [...new Set(data.map((row) => row.icPartName))],
      supplierName: [...new Set(data.map((row) => row.supplierName))],
    },
    totalCount,
  };
};

export const createInspection = async (inspection: Record<string, unknown>): Promise<Record<string, unknown>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    ...inspection,
    inspectionId: `INS-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
  };
};

export const fetchInspectionPDF = async (tableData: TableData): Promise<Blob> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const doc = new jsPDF("l", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();

  // Set title
  doc.setFontSize(18);
  doc.text("Inspection Report", pageWidth / 2, 15, { align: "center" });

  // Prepare table data
  const headers = tableData.headers.map((header) => header.label);
  const body = tableData.rows.map((row) => tableData.headers.map((header) => row[header.key]));

  // Generate table
  (doc as any).autoTable({
    head: [headers],
    body,
    startY: 25,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
  });

  // Return the PDF as a Blob
  return doc.output("blob");
};
