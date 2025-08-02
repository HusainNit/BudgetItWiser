import { BudgetsGetter } from "../services/budget";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AllBudgets = ({ user }) => {
  const [budgetList, setBudgetList] = useState(null);

  useEffect(() => {
    const budgetFetch = async () => {
      const data = await BudgetsGetter();
      setBudgetList(data);
    };
    budgetFetch();
  }, []);

  return (
    <>
      {user ? (
        budgetList ? (
          <div className="budgetContainer">
            <div className="floatAddBox">
              <Link to="add/">
                <button>Add Budget</button>
              </Link>
            </div>
            <h1 className="PageTitle">Budget</h1>
            <small className="underText">Create and truck your budgets</small>

            <div className="budget-wrapper">
              {budgetList.map((budget, idx) => (
                <div className="budgetData" key={idx}>
                  <Link to={`${budget.id}/expenses/`} className="fullLinkArea">
                    <h2 className="fontTitle">Monthly Budget</h2>
                    <small className="underText">
                      {budget.month}/{budget.year}
                    </small>
                    <h2 className="upSpace fonth2">
                      {budget.total_budget + " BD"}
                    </h2>
                    <h2 className="fonth2">Status: {budget.status}</h2>
                  </Link>

                  <div className="budgetActions">
                    <Link to={`edit/${budget.id}`}>
                      <img src="../svgs/editIcon.png" alt="editImag" />
                    </Link>
                  </div>
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
export default AllBudgets;
