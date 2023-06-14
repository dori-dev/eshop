import Form from "../formContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userLoginAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, userInfo, loading } = useSelector((state) => state.user);
  let query = {};
  search
    .slice(1)
    .split("&")
    .forEach((item) => {
      let [key, value] = item.split("=");
      query[key] = value;
    });
  const redirect = query["redirect"] ? query["redirect"] : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <>
      <Form>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3 mt-4">
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
            />
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <div>
          New Customer?
          <Link to={`/register?redirect=${redirect}`} className="btn btn-link">
            Register
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
