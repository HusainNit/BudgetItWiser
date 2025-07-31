import { Routes, Route } from "react-router-dom";

import AllExpenses from "../components/AllExpenses";

const Expense = ({ user }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllExpenses user={user} />} />
        {/*<Route path="add/" element={<AddBudget user={user} />} />
        <Route path="edit/:id" element={<EditBudget user={user} />} /> */}
      </Routes>
    </>
  );
};
export default Expense;
