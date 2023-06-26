import Form from "../formContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userRegisterAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../message";
import RingLoader from "react-spinners/RingLoader";
import { override, getQueries } from "./utils";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: (values) => {
      dispatch(userRegisterAction(values.name, values.email, values.password));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Name must be 50 characters or less.")
        .min(4, "Name must be 4 characters or more.")
        .required("Name is required."),
      email: Yup.string()
        .email("Enter valid email address.")
        .required("Email is required."),
      password: Yup.string()
        .max(50, "Password must be 50 characters or less.")
        .min(8, "Password must be 8 characters or more.")
        .required("Password is required."),
      password2: Yup.string()
        .max(50, "Password must be 50 characters or less.")
        .min(8, "Password must be 8 characters or more.")
        .required("Confirm password is required.")
        .oneOf(
          [Yup.ref("password"), null],
          "Password and confirm password must match."
        ),
    }),
  });
  // redirect parameters
  const { search } = useLocation();
  const query = getQueries(search);
  const redirect = query["redirect"] ? query["redirect"] : "/";
  // redux
  const { error, emailForVerify, loading } = useSelector(
    (state) => state.userRegister
  );
  // redirect when logged in
  useEffect(() => {
    if (emailForVerify) {
      navigate(`/verify?redirect=${redirect}`);
    }
  }, [navigate, redirect, emailForVerify]);
  return (
    <Form>
      <h1 className="mb-4">Register</h1>
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
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className={
              formik.touched.name && formik.errors.name
                ? "form-control is-invalid"
                : "form-control"
            }
            id="name"
            placeholder="Enter your name"
            onBeforeInput={formik.handleBlur}
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div id="nameFeedback" className="invalid-feedback">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
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
        <div className="mb-3 mt-2">
          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={
              formik.touched.password2 && formik.errors.password2
                ? "form-control is-invalid"
                : "form-control"
            }
            id="password2"
            placeholder="Enter your password again"
            onBeforeInput={formik.handleBlur}
            {...formik.getFieldProps("password2")}
          />
          {formik.touched.password2 && formik.errors.password2 ? (
            <div id="password2Feedback" className="invalid-feedback">
              {formik.errors.password2}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className={
            loading ? "btn btn-primary w-100 disabled" : "btn btn-primary w-100"
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
  );
};

export default Register;
