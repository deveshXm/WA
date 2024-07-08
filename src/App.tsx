import styled from "styled-components";
import Dashboard from "./views/Dashboard";

const AppContainer = styled.div`
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Dashboard />
    </AppContainer>
  );
};

export default App;
