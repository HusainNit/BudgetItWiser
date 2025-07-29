import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInUser } from "../services/auth";

// TODO edit the sign in page
const SignIn = ({ setUser }) => {
  let navigate = useNavigate();

  const initialState = { email: "", username: "", password: "" };

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await SignInUser(formValues);
    setFormValues(initialState);
    setUser(payload);
    navigate("/");
  };

  return (
    <div className="auth">
      <label htmlFor="authForm" className="authLabel">
        Sign In
      </label>

      <form className="authForm" id="authForm" onSubmit={handleSubmit}>

        <div className="input-wrapper">
          <label htmlFor="username" className="titleFiled">
            Username
          </label>
          <input
            onChange={handleChange}
            id="username"
            type="username"
            placeholder="husain"
            value={formValues.username}
            required
            autoComplete="username"
            className="authUsername"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="email" className="titleFiled">
            Email
          </label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="example@example.com"
            value={formValues.email}
            required
            autoComplete="email"
            className="authEmail"
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
            className="authPassword"
          />
        </div>

        <div className="button-wrapper">
          <button
            className="authButton"
            disabled={!formValues.email || !formValues.password}
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="authLink-wrapper">
        <label htmlFor="authLink" className="authLinkTitle">
          Don't have an Account?
        </label>
        <Link to="/register" id="authLink" className="authLink">
          register
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
