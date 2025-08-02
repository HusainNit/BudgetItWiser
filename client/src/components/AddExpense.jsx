import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { ExpenseSetter } from "../services/expenses";

const AddExpense = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialState = {
    budget_id: id,
    expense_name: "",
    max_expense_budget: 0,
    amount: 0,
    expense_type: "",
  };

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = await ExpenseSetter(formValues);
    if (payload) {
      setFormValues(initialState);
      navigate(`/budgets/${id}/expenses/`);
    }
  };
  return (
    <>
      {user ? (
        <div className="addExpenseContainer">
          <label htmlFor="AddExpenseForm" className="AddBudgetLabel">
            Create new Expense
          </label>

          <form
            className="AddExpenseForm"
            id="AddExpenseForm"
            onSubmit={handleSubmit}
          >
            <div className="input-wrapper">
              <label htmlFor="expense_name" className="titleFiled">
                Expense Name
              </label>
              <input
                onChange={handleChange}
                id="expense_name"
                type="text"
                placeholder="food"
                value={formValues.expense_name}
                required
                autoComplete="expense_name"
                className="AddBudgetYear"
                min="1900"
                title="Enter a expense name"
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="max_expense_budget" className="titleFiled">
                Max Expense Budget
              </label>
              <input
                onChange={handleChange}
                id="max_expense_budget"
                type="number"
                placeholder="500"
                value={formValues.max_expense_budget}
                required
                autoComplete="max_expense_budget"
                className="AddBudgetMonth"
                min="0.01"
                title="Enter a the max amount for this expense"
                max="999999999.99"
                step="0.01"
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="amount" className="titleFiled">
                Amount
              </label>
              <input
                onChange={handleChange}
                type="number"
                id="amount"
                placeholder="300.00"
                value={formValues.amount}
                required
                className="amount"
                min="0.01"
                max="9999999999.99"
                step="0.01"
                title="Enter a the amount of the used expense"
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="expense_type" className="titleFiled">
                Expense Type
              </label>
              <select
                name="expense_type"
                id="expense_type"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select Expense Type --
                </option>
                <option value="one_time">One Time Expense</option>
                <option value="fixed">Fixed Expense</option>
              </select>
            </div>

            <div className="button-wrapper">
              <button
                className="AddBudgetButton"
                disabled={
                  !formValues.expense_name ||
                  !formValues.max_expense_budget ||
                  !formValues.amount ||
                  formValues.expense_type === "" ||
                  Number(formValues.max_expense_budget) <
                    Number(formValues.amount)
                }
              >
                Add Expense
              </button>
            </div>
          </form>
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

export default AddExpense;
