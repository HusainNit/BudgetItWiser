import { UserSetter } from "../services/auth";
import { UserGetter } from "../services/auth";

import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfileEdit = ({ user }) => {
  let navigate = useNavigate();
  const initialState = { username: "", email: "", password: "", CPassword: "" };

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const ProfileData = async () => {
      let payload = await UserGetter();
      if (payload) {
        setFormValues({
          username: payload.username,
          email: payload.email,
          password: "",
          CPassword: "",
        });
      }
    };
    ProfileData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await UserSetter({
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    });
    if (payload) {
      setFormValues(initialState);
      navigate("/profile/");
    }
  };
  return (
    <>
      {user ? (
        <div className="ProfileEditContainer">
          <label htmlFor="AddBudgetForm" className="AddBudgetLabel">
            Edit Profile
          </label>

          <form
            className="AddBudgetForm"
            id="AddBudgetForm"
            onSubmit={handleSubmit}
          >
            <div className="input-wrapper">
              <label htmlFor="username" className="titleFiled">
                Username
              </label>
              <input
                onChange={handleChange}
                id="username"
                type="text"
                placeholder="Husain"
                value={formValues.username}
                required
                autoComplete="username"
                className="AddBudgetYear"
                title="Enter a your username"
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="email" className="titleFiled">
                Email
              </label>
              <input
                onChange={handleChange}
                id="email"
                type="text"
                placeholder="text@gmail.com"
                value={formValues.email}
                required
                autoComplete="email"
                className="AddBudgetMonth"
                title="Enter your email"
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password" className="titleFiled">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                value={formValues.password}
                required
                className="AddBudgetTotal_budget"
                title="Enter your password"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="CPassword" className="titleFiled">
                Confirm Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="CPassword"
                value={formValues.CPassword}
                required
                className="AddBudgetTotal_budget"
                title="Enter your password"
              />
            </div>

            <div className="button-wrapper">
              <button
                className="AddBudgetButton"
                disabled={
                  !formValues.username ||
                  !formValues.email ||
                  !formValues.password ||
                  formValues.password !== formValues.CPassword
                }
              >
                Edit Profile
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

export default ProfileEdit;
