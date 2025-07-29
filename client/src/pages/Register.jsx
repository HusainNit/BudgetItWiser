import { useNavigate, Link } from "react-router-dom";
import { RegisterUser } from "../services/auth";
import { useState } from "react";

// TODO make backend validation instead of the frontEnd
const Register = () => {
  let navigate = useNavigate();

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await RegisterUser({
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    });

    if (res) {
      setFormValues(initialState);
      navigate("/signin");
    }
  };

  return (
    <div className="auth">
      <label htmlFor="authForm" className="authLabel">
        Register
      </label>

      <form onSubmit={handleSubmit} className="authForm" id="authForm">
        <div className="input-wrapper">
          <label htmlFor="username" className="titleFiled">
            Username
          </label>
          <input
            onChange={handleChange}
            id="username"
            type="text"
            placeholder="husain"
            value={formValues.username}
            required
            autoComplete="username"
            className="authUsername"
            pattern="[\w\s]{3,}"
          />
          <small>must have at least 3 letters and _ </small>
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
            pattern="[\w\-\.]{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{3,}"
          />
          <small>must have at least 3 letters and @ </small>
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
            pattern=".{8,}" // TODO make react Stats for validation
          />
          <small>
            must have at least 8 letters, one uppercase letter, and one of
            @#$%&*/\
          </small>
        </div>

        <div className="input-wrapper">
          <label htmlFor="confirmPassword" className="titleFiled">
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="confirmPassword"
            value={formValues.confirmPassword}
            required
          />
        </div>

        <div className="button-wrapper">
          <button
            className="authButton"
            disabled={
              !formValues.email ||
              !formValues.username ||
              !formValues.password ||
              !formValues.confirmPassword ||
              formValues.password !== formValues.confirmPassword
            }
          >
            Register
          </button>
        </div>
      </form>

      <div className="authLink-wrapper">
        <label htmlFor="authLink" className="authLinkTitle">
          Already have an Account?
        </label>
        <Link to="/signin" id="authLink" className="authLink">
          sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
