import Form from "../formContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRegisterAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../message";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // redirect parameters
  const { search } = useLocation();
  let query = {};
  search
    .slice(1)
    .split("&")
    .forEach((item) => {
      let [key, value] = item.split("=");
      query[key] = value;
    });
  const redirect = query["redirect"] ? query["redirect"] : "/";
  // redux
  const { error, userInfo, loading } = useSelector(
    (state) => state.userRegister
  );
  // local states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  // on submit
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage("Password and confirm password don't match!");
    } else {
      dispatch(userRegisterAction(name, email, password));
    }
  };
  // redirect when logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <>
      <Form>
        <h1 className="mb-4">Register</h1>
        {error && <Message variant="danger" message={error} />}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3 mt-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 mt-2">
            <label htmlFor="password2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={message ? "form-control is-invalid" : "form-control"}
              id="password2"
              placeholder="Enter your password again"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <div id="password2Feedback" className="invalid-feedback">
              {message}
            </div>
          </div>
          <button
            className={
              loading
                ? "btn btn-primary w-100 disabled"
                : "btn btn-primary w-100"
            }
          >
            Register
          </button>
        </form>
        <div>
          Do you have an account?
          <Link to={`/login?redirect=${redirect}`} className="btn btn-link">
            Login
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Register;
