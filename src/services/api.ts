import jsPDF from "jspdf";
import "jspdf-autotable";
import { isWithinInterval } from "date-fns";

import data from "../data.ts";
import { convertTimeFormat } from "../utils/convertTimeFormat.ts";

// DUMMY API CALLS

export const fetchTableData = async (params: FetchParams): Promise<TableData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { page, pageSize, filters } = params;
  const filteredData = data.filter((row) => {
    return Object.entries(filters).every(([key, filterValue]) => {
      if (filterValue === null || filterValue === "") return true;
      const cellData = row[key as keyof typeof row];
      if (key === "createdAt" && Array.isArray(filterValue)) {
        const [start, end] = filterValue;
        if (start && end) {
          const rowDate = new Date(cellData.value as string);
          return isWithinInterval(rowDate, { start, end });
        }
        return true;
      }
      return cellData.value === filterValue;
    });
  });

  // Calculate pagination
  const totalCount = filteredData.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    headers: [
      { key: "inspectionStatus", label: "Inspection Status", type: "string", filter: true },
      { key: "inspectionId", label: "Inspection ID", type: "string", filter: false },
      { key: "lotStatusVerdict", label: "Lot Status/Verdict", type: "string", filter: true },
      { key: "icPartName", label: "IC Part Name", type: "string", filter: true },
      { key: "supplierName", label: "Supplier Name", type: "string", filter: true },
      { key: "totalOrderQuantity", label: "Total Order Quantity", type: "number", filter: false },
      { key: "samplingSize", label: "Sampling Size", type: "number", filter: false },
      { key: "totalOK", label: "Total OK", type: "number", filter: false },
      { key: "totalNOK", label: "Total NOK", type: "number", filter: false },
      { key: "createdAt", label: "Created At", type: "date", filter: true },
    ],
    rows: paginatedData.map((data) => {
      data.createdAt.value = convertTimeFormat(data.createdAt.value as string);
      return data;
    }),
    filterOptions: {
      inspectionStatus: [...new Set(data.map((row) => row.inspectionStatus.value as string))],
      lotStatusVerdict: [...new Set(data.map((row) => row.lotStatusVerdict.value as string))],
      icPartName: [...new Set(data.map((row) => row.icPartName.value as string))],
      supplierName: [...new Set(data.map((row) => row.supplierName.value as string))],
    },
    totalCount,
  };
};

export const createInspection = async (inspection: TableRow): Promise<TableRow> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  inspection.inspectionStatus.style = `color: #ffffff;padding: 5px;border-radius:5px; background-color:${
    inspection.inspectionStatus.value === "OPEN" ? "gray" : inspection.inspectionStatus.value === "ONGOING" ? "orange" : "#007bff"
  }; font-weight: 600;width:fit-content`;
  inspection.inspectionId.style = "color: #007bff';";
  inspection.totalOK.style = "color: #28a745;";
  inspection.totalNOK.style = "color: #dc3545;";

  data.push(inspection);

  return inspection;
};

export const fetchInspectionPDF = async (tableData: TableData): Promise<Blob> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const doc = new jsPDF("l", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();

  // Set title
  doc.setFontSize(18);
  doc.text("Inspection Report", pageWidth / 2, 15, { align: "center" });

  // Prepare table data
  const headers = tableData.headers.map((header) => header.label);
  const body = tableData.rows.map((row) => tableData.headers.map((header) => row[header.key].value));

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
