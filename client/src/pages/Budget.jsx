import { BudgetGetter } from "../services/budget";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Budget = ({ user }) => {
  const [budgetList, setBudgetList] = useState(null);

  useEffect(() => {
    const budgetFetch = async () => {
      const data = await BudgetGetter();
      setBudgetList(data);
    };
    budgetFetch();
  }, []);

  return (
    <>
      {user ? (
        budgetList ? (
          <div className="budgetContainer">
            <h1>Budget</h1>
            <small className="underText">Create and truck your budgets</small>
            <div className="budget-wrapper">
              {budgetList.map((budget, idx) => (
                <div className="budgetData" key={idx}>
                  <h2> {budget.year}</h2>
                  <h2> {budget.month}</h2>
                  <h2> {budget.status}</h2>
                  <h2> {budget.total_budget}</h2>
                  <h2> {budget.user.username}</h2>
                </div>
              ))}
            </div>
          </div>
        ) : Array.isArray(budgetList) && budgetList.length > 0 ? (
          <h1 className="center"> no data</h1>
        ) : (
          <h1 className="center">Loading data....</h1>
        )
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
export default Budget;
