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
    <div className="signin">
      <label htmlFor="col" className="signInLable">
        sign In
      </label>

      <form className="col" id="col" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username" className="titleFiled">
            username
          </label>
          <input
            onChange={handleChange}
            id="username"
            type="username"
            placeholder="husain"
            value={formValues.username}
            required
            autoComplete="usrname"
            className="username"
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
            className="emaillogin"
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
            className="passLogin"
          />
        </div>
        <div className="btnLoginC">
          <button
            className="btnlogin"
            disabled={!formValues.email || !formValues.password}
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="linkRegC">
        <label htmlFor="linkReg" className="labsign">
          Don't have an Account?
        </label>
        <Link to="/register" id="linkReg" className="linkReg">
          register
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
