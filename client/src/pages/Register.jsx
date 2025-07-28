import { useNavigate, Link } from "react-router-dom";
import { RegisterUser } from "../services/auth";
import { useState } from "react";

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
    <div className="register">
      <label htmlFor="col" className="registerLable">
        Register
      </label>
      <form onSubmit={handleSubmit} className="col" id="col">
        <div className="input-wrapper">
          <label htmlFor="username" className="titleFiled">
            Username
          </label>
          <input
            onChange={handleChange}
            id="username"
            type="text"
            placeholder="John Doe"
            value={formValues.username}
            required
            autoComplete="username"
            className="nameReg"
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
            className="emailReg"
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
            className="passReg"
          />
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
        <div className="RegbtnC">
          <button
            className="Regbtn"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.password === formValues.confirmPassword)
            }
          >
            Register
          </button>
        </div>
      </form>
      <div className="linkLoginC">
        <label htmlFor="linkReg" className="labsign">
          Already have an Account?
        </label>
        <Link to="/signin" id="linkReg" className="linkReg">
          sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
