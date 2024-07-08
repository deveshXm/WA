import React, { useState } from "react";
import Table from "../../components/Table";
import Button from "../../components/common/Button";
import FilterBar from "../../components/FilterBar";
import NewInspectionModal from "../../components/NewInspectionModal";
import { useInspections } from "../../hooks/useInspections";
import downloadIcon from "../../assets/download.svg";
import { Container, Header, Separator, TableHeader, TableHeading, TableRowCount, TableTitle } from "./styles";
import { fetchInspectionPDF } from "../../services/api";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tableData, loading, error, updateFilters, addInspection, page, pageSize, setPage, setPageSize } = useInspections();

  const handleDownloadPDF = async () => {
    try {
      const pdfBlob = await fetchInspectionPDF();
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

  const handleNewInspection = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitInspection = (newInspection: TableRow) => {
    addInspection(newInspection);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Header>
        {tableData && <FilterBar headers={tableData.headers} filterOptions={tableData.filterOptions} onFilterChange={updateFilters} />}
        <Button onClick={handleNewInspection} variant="primary">
          + New Inspection
        </Button>
      </Header>
      <Separator />
      {tableData && (
        <>
          <TableHeader>
            <TableHeading>
              <TableTitle>Inspections &nbsp;</TableTitle>
              <TableRowCount>({tableData.totalCount})</TableRowCount>
            </TableHeading>
            <Button onClick={handleDownloadPDF}>
              <img src={downloadIcon} alt="download" width={15} height={15} />
            </Button>
          </TableHeader>
          <Table data={tableData} loading={loading} error={error} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
        </>
      )}
      {isModalOpen && tableData && (
        <NewInspectionModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitInspection} headers={tableData.headers || []} />
      )}
    </Container>
  );
};

export default Dashboard;
