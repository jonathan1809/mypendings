import "./App.css";
import DashboardContainer from "./containers/DashboardContainer";
import TaskProvider from "./context/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <DashboardContainer />
    </TaskProvider>
  );
}

export default App;
