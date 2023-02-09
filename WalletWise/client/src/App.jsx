import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AccountsPage from "./pages/AccountsPage";
import TransactionsPage from "./pages/TransactionsPage";
import EditEntriesPage from "./pages/EditEntriesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EditAccountPage from "./pages/EditAccountPage";

function App() {
  const [entries, setEntries] = useState([]);
  const [userinfo, setUserInfo] = UserAuth();

  useEffect(() => {
    fetchTransaction();
  }, [userinfo]);

  const fetchTransaction = () => {
    const id = userinfo.id;
    fetch(`/api/transaction/${id}`)
      .then((response) => response.json())
      .then((data) => setEntries(data));
  };

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/home"
          element={
            <HomePage entries={entries} fetchTransaction={fetchTransaction} />
          }
        />
        <Route
          path="/transaction/:id"
          element={<EditEntriesPage fetchTransaction={fetchTransaction} />}
        />
        <Route
          path="/accounts-overview"
          element={<AccountsPage entries={entries} />}
        />
        <Route path="/edit-account/:id" element={<EditAccountPage />} />
        <Route
          path="/transactions-history"
          element={
            <TransactionsPage
              entries={entries}
              fetchTransaction={fetchTransaction}
              setEntries={setEntries}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
