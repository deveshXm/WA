import React, { useState } from "react";
import styled from "styled-components";
import FilterBar from "./components/FilterBar";
import Table from "./components/Table";
import Button from "./components/Button";
import NewInspectionModal from "./components/NewInspectionModal";
import { useInspections } from "./hooks/useInspections";
import { generatePDF } from "./utils/pdfGenerator";

const AppContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
`;

const App: React.FC = () => {
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
    <AppContainer>
      <Header>
        {tableData && <FilterBar headers={tableData.headers} filterOptions={tableData.filterOptions} onFilterChange={updateFilters} />}
        <Button onClick={() => setIsModalOpen(true)}>+ New Inspection</Button>
      </Header>
      {tableData && (
        <>
          <TableHeader>
            <Title>Inspections ({tableData.totalCount})</Title>
            <Button onClick={handleDownloadPDF}>Download PDF</Button>
          </TableHeader>
          <Table data={tableData} loading={loading} error={error} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
        </>
      )}
      {isModalOpen && tableData && (
        <NewInspectionModal
          headers={tableData.headers}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(newInspection) => {
            addInspection(newInspection);
            setIsModalOpen(false);
          }}
        />
      )}
    </AppContainer>
  );
};

export default App;
