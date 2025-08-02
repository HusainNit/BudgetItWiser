import { Routes, Route } from "react-router-dom";

import AllExpenses from "../components/AllExpenses";
import AddExpense from "../components/AddExpense.jsx";
import EditExpense from "../components/Edit-DeleteExpense.jsx";

const Expense = ({ user }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllExpenses user={user} />} />
        <Route path="add/" element={<AddExpense user={user} />} />
        <Route path=":exId/edit/" element={<EditExpense user={user} />} />
      </Routes>
    </>
  );
};
export default Expense;
