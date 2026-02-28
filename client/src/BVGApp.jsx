import { useContext } from "react";
import { AppContext, AppProvider } from "./context/AppContext";
import LoginPage from "./pages/LoginPage";
import AdminShell from "./layouts/AdminShell";
import EmployeeShell from "./layouts/EmployeeShell";
import "./styles/bvg.css";

function AppRouter() {
  const { view } = useContext(AppContext);
  if (view === "login") return <LoginPage />;
  if (view === "admin") return <AdminShell />;
  if (view === "employee") return <EmployeeShell />;
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
