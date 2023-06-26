import Form from "../formContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userLoginAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../message";
import RingLoader from "react-spinners/RingLoader";
import { useFormik } from "formik";
import { override, getQueries } from "./utils";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(userLoginAction(values.email, values.password));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter valid email address")
        .required("Email field is required."),
      password: Yup.string()
        .max(50, "Password must be 50 characters or less")
        .min(8, "Password must be 8 characters or more")
        .required("Password field is required."),
    }),
  });
  // redux
  const { error, userInfo, loading } = useSelector((state) => state.user);
  // redirect parameters
  const { search } = useLocation();
  const query = getQueries(search);
  const redirect = query["redirect"] ? query["redirect"] : "/";
  // redirect when logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <>
      <Form>
        <h1 className="mb-4">Login</h1>
        {error && <Message variant="danger" message={error} />}
        {loading ? (
          <RingLoader
            color="#000"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading"
          />
        ) : (
          <></>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className={
                formik.touched.email && formik.errors.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="email"
              placeholder="name@example.com"
              onBeforeInput={formik.handleBlur}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div id="emailFeedback" className="invalid-feedback">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-3 mt-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={
                formik.touched.password && formik.errors.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="password"
              placeholder="Enter your password"
              onBeforeInput={formik.handleBlur}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div id="passwordFeedback" className="invalid-feedback">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            className={
              loading
                ? "btn btn-primary w-100 disabled"
                : "btn btn-primary w-100"
            }
          >
            Login
          </button>
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
