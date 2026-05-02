/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AICoach from "./pages/AICoach";
import Signup from "./pages/Signup";
import Layout from "./layout/Layout";
import { FinanceProvider, useFinance } from "./FinanceContext";
import "./lib/i18n";

function AppRoutes() {
  const { userEmail } = useFinance();

  return (
    <Routes>
      {!userEmail ? (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </>
      ) : (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/ai-coach" element={<AICoach />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FinanceProvider>
  );
}
