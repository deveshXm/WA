import React, { useState } from "react";

import Table from "../../components/Table";
import Button from "../../components/common/Button";
import FilterBar from "../../components/FilterBar";
import NewInspectionModal from "../../components/NewInspectionModal";

import { generatePDF } from "../../utils/pdfGenerator";
import { useInspections } from "../../hooks/useInspections";

import downloadIcon from "../../assets/download.svg";
import { Container, Header, Seperator, TableHeader, TableHeading, TableRowCount, TableTitle } from "./styles";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tableData, loading, error, updateFilters, addInspection, page, pageSize, setPage, setPageSize } = useInspections();

  const handleDownloadPDF = async () => {
    if (tableData) {
      try {
        await generatePDF(tableData);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Header>
        {tableData && <FilterBar headers={tableData.headers} filterOptions={tableData.filterOptions} onFilterChange={updateFilters} />}
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          + New Inspection
        </Button>
      </Header>
      <Seperator />
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
        <NewInspectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(newInspection) => {
            addInspection(newInspection);
            setIsModalOpen(false);
          }}
          headers={tableData?.headers || []}
        />
      )}
    </Container>
  );
};

export default Dashboard;
