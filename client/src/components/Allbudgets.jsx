import { BudgetsGetter } from "../services/budget";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OneBudgetChart from "../components/charts/OneBudgetChart";
import { chartGetter } from "../services/chart";
import CircleProgress from "./ui/CircleProgress";

const AllBudgets = ({ user }) => {
  const [budgetList, setBudgetList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const budgetFetch = async () => {
      setLoading(true);
      const data = await chartGetter();
      if (data) {
        setBudgetList(data);
        setLoading(false);
      }
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
            <h1 className="PageTitle">Budgets</h1>
            <small className="underText">Create and truck your budgets</small>

            <div className="budget-wrapper">
              {budgetList.map((budget, idx) => (
                <div className="budgetData" key={idx}>
                  <Link to={`${budget.id}/expenses/`} className="fullLinkArea">
                    <h2 className="fontTitle">Monthly Budget</h2>
                    <small className="underText">
                      {budget.month}/{budget.year}
                    </small>
                    <div className="labelBlock">
                      <span className="labelTitle">Status: </span>
                      <span className="labelValue">{budget.status} </span>
                    </div>
                    <OneBudgetChart
                      total_budget={budget.total_budget}
                      total_expenses={budget.total_expenses}
                      status={budget.status}
                    />
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
          <CircleProgress  loading={loading} />
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
