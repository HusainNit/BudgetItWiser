import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { ExpensesGetter } from "../services/expenses";
import ExpenseBarChart from "../charts/ExpenseBarChart";

const AllExpenses = ({ user }) => {
  const { id } = useParams();
  const [expenseList, setExpenseList] = useState(null);
  let displayCount = 1;

  useEffect(() => {
    const budgetFetch = async () => {
      const data = await ExpensesGetter();
      setExpenseList(data);
    };
    budgetFetch();
  }, []);
  return (
    <>
      {user ? (
        expenseList ? (
          <div className="AllExpenses">
            <div className="floatAddBox">
              <Link to="add/">
                <button>Add Expense</button>
              </Link>
            </div>
            <h1 className="PageTitle">Expenses</h1>
            <small className="underText">Create and truck your Expenses</small>

            <div className="ExpenseContainer">
              {expenseList.map((expense, idx) =>
                expense.budget.id == id ? (
                  <Link to={`${expense.id}/edit`} key={idx}>
                    <div className="expense-wrapper" key={expense.id}>
                      <h2 className="fontTitle">Expense #{displayCount++} </h2>
                      <h3 className="expenseName">{expense.expense_name}</h3>

                      <ExpenseBarChart
                        total={expense.max_expense_budget}
                        spent={expense.amount}
                      />

                      <h2 className="fonth2 center">
                        Expense type: {expense.expense_type}
                      </h2>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        ) : Array.isArray(expenseList) && expenseList.length > 0 ? (
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

export default AllExpenses;
