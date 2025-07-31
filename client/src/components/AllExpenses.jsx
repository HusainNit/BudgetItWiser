import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { ExpensesGetter } from "../services/expenses";

const AllExpenses = ({ user }) => {
  const [expenseList, setExpenseList] = useState(null);

  useEffect(() => {
    const budgetFetch = async () => {
      const data = await ExpensesGetter();
      console.log(data);
      setExpenseList(data);
    };
    budgetFetch();
  }, []);
  return (
    <>
      {user ? (
        expenseList ? (
          <div className="AllExpenses">
            <h1 className="PageTitle">Expenses</h1>
            <small className="underText">Create and truck your Expenses</small>

            <div className="ExpenseContainer">
              {expenseList.map((expense) => (
                <div className="expense-wrapper">
                  <h1>{expense.expense_name}</h1>
                  <h1>{expense.max_expense_budget}</h1>
                  <h1>{expense.amount}</h1>
                  <h1>{expense.expense_type}</h1>
                </div>
              ))}
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
