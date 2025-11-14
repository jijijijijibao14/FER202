import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { ExpenseProvider } from "./contexts/ExpenseContext";

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <AppRoutes />
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
