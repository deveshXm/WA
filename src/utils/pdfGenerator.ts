import { fetchInspectionPDF } from "../services/api";

export const generatePDF = async (tableData: TableData) => {
  try {
    const pdfBlob = await fetchInspectionPDF(tableData);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inspection_report.pdf";
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
