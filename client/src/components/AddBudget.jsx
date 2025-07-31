import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BudgetSetter } from "../services/budget";

const AddBudget = ({ user }) => {
  let navigate = useNavigate();
  const initialState = { year: "", month: "", total_budget: "" };

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await BudgetSetter(formValues);
    if (payload) {
      setFormValues(initialState);
      navigate("/budgets/");
    }
  };

  return (
    <>
      {user ? (
        <div className="newBudgetContainer">
          <label htmlFor="AddBudgetForm" className="AddBudgetLabel">
            Create new budget
          </label>

          <form
            className="AddBudgetForm"
            id="AddBudgetForm"
            onSubmit={handleSubmit}
          >
            <div className="input-wrapper">
              <label htmlFor="year" className="titleFiled">
                Year
              </label>
              <input
                onChange={handleChange}
                id="year"
                type="range"
                placeholder="2025"
                value={formValues.year}
                required
                autoComplete="year"
                className="AddBudgetYear"
                min="1900"
                title="Enter a 4-digit year like 2025"
                max={new Date().getFullYear()}
              />
              <output htmlFor="month">{formValues.year || "0000"}</output>
            </div>

            <div className="input-wrapper">
              <label htmlFor="month" className="titleFiled">
                Month
              </label>
              <input
                onChange={handleChange}
                id="month"
                type="range"
                placeholder="1-12"
                value={formValues.month}
                required
                autoComplete="month"
                className="AddBudgetMonth"
                min="1"
                title="Enter a 1 or 2 digit month like 9 or 11"
                max="12"
              />
              <output htmlFor="month">{formValues.month || "0"}</output>
            </div>

            <div className="input-wrapper">
              <label htmlFor="total_budget" className="titleFiled">
                Total Budget Amount
              </label>
              <input
                onChange={handleChange}
                type="number"
                id="total_budget"
                placeholder="500.00"
                value={formValues.total_budget}
                required
                className="AddBudgetTotal_budget"
                min="0.01"
                max="9999999999.99"
                step="0.01"
                title="Enter a decimal number with up to 2 decimal places"
              />
            </div>

            <div className="button-wrapper">
              <button
                className="AddBudgetButton"
                disabled={
                  !formValues.year ||
                  !formValues.month ||
                  !formValues.total_budget
                }
              >
                Add Budget
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

export default AddBudget;
