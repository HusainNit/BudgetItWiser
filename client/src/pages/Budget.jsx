import { Routes, Route } from "react-router-dom";

import AllBudgets from "../components/Allbudgets";
import AddBudget from "../components/AddBudget";
import EditBudget from "../components/Edit-DeleteBudget";

const Budget = ({ user }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllBudgets user={user} />} />
        <Route path="add/" element={<AddBudget user={user} />} />
        {/* TODO complete the edit page / edit button in same page */}
        <Route path="edit/:id" element={<EditBudget user={user} />} />
      </Routes>
    </>
  );
};
export default Budget;
