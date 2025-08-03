import BudgetChart from "../charts/BudgetChart";
import CategoryExpensesBar from "../charts/CategoryExpensesBar";
import BudgetStatusPieChart from "../charts/BudgetStatusPieChart";
import ExpenseStatusBarChart from "../charts/ExpenseStatusBarChart";

import { Link } from "react-router-dom";

const Analytic = ({ user }) => {
  return (
    <>
      {user ? (
        <div className="analticContainer">
          <BudgetChart />
          <CategoryExpensesBar />
          <BudgetStatusPieChart />
          <ExpenseStatusBarChart />
        </div>
      ) : (
        <div className="CantView">
          <h2>
            must <Link to="/signin">Sign In</Link> in to view this page
          </h2>
        </div>
      )}
    </>
  );
};

export default Analytic;
