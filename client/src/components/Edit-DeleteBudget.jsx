import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BudgetEdit } from "../services/budget";
import { OneBudgetGetter } from "../services/budget";
import { BudgetDelete } from "../services/budget";

const EditBudget = ({ user }) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialState = { year: "", month: "", total_budget: "" };

  useEffect(() => {
    const getBudget = async (id) => {
      const data = await OneBudgetGetter(id);
      setFormValues({
        year: data.year || "0000",
        month: data.month || "0",
        total_budget: data.total_budget || "",
      });
    };
    getBudget(id);
  }, []);

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload;

    switch (e.nativeEvent.submitter.id) {
      case "delete":
        payload = await BudgetDelete(id);
        break;
      case "add":
        payload = await BudgetEdit(formValues, id);
        break;
    }

    if (payload) {
      setFormValues(initialState);
      navigate("/budgets/");
    }
  };

  return (
    <>
      {user ? (
        <div className="EditBudgetContainer">
          <label htmlFor="EditBudgetForm" className="EditBudgetLabel">
            Edit Budget
          </label>

          <form
            className="EditBudgetForm"
            id="EditBudgetForm"
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
              <output htmlFor="month">{formValues.year}</output>
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
              <output htmlFor="month">{formValues.month}</output>
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

            <div className="button-wrapper twoButtons">
              <button
                className="AddBudgetButton"
                id="add"
                disabled={
                  !formValues.year ||
                  !formValues.month ||
                  !formValues.total_budget
                }
              >
                Edit Budget
              </button>
              <button
                className="DeleteBudgetButton"
                id="delete"
                disabled={
                  !formValues.year ||
                  !formValues.month ||
                  !formValues.total_budget
                }
              >
                Delete Budget
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

export default EditBudget;
