import Form from "../formContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verifyCodeAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../message";
import RingLoader from "react-spinners/RingLoader";
import { override, getQueries } from "./utils";
import { useFormik } from "formik";
import * as Yup from "yup";

const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // redirect parameters
  const { search } = useLocation();
  const query = getQueries(search);
  const redirect = query["redirect"] ? query["redirect"] : "/";
  // email
  const email = localStorage.getItem("emailForVerify");
  // formik
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      dispatch(verifyCodeAction(email, values.code));
    },
    validationSchema: Yup.object({
      code: Yup.number()
        .typeError("You must specify a number.")
        .required("Code is required.")
        .test(
          "len",
          "The code must be exactly 4 characters.",
          (value) => value.toString().length === 4
        ),
    }),
  });
  // redux
  const { error, userInfo, loading } = useSelector((state) => state.verifyCode);
  // redirect when user created
  useEffect(() => {
    if (!email) {
      navigate(`/register?redirect=${redirect}`);
    }
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo, email]);
  // send another verification code
  const sendNewVerificationCode = () => {
    console.log("sent");
  };
  return (
    <Form>
      <h1 className="mb-4">Verify</h1>
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
          <label htmlFor="code" className="form-label">
            Code
          </label>
          <input
            type="number"
            className={
              formik.touched.code && formik.errors.code
                ? "form-control is-invalid"
                : "form-control"
            }
            id="code"
            placeholder="Enter your code"
            onBeforeInput={formik.handleBlur}
            {...formik.getFieldProps("code")}
          />
          {formik.touched.code && formik.errors.code ? (
            <div id="codeFeedback" className="invalid-feedback">
              {formik.errors.code}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className={
            loading ? "btn btn-primary w-100 disabled" : "btn btn-primary w-100"
          }
        >
          Verify
        </button>
      </form>
      <div className="row mt-3 text-center">
        <div className="col-6">5:00 remaining</div>
        <div className="col-6">
          <button
            onClick={sendNewVerificationCode}
            className="btn btn-dark btn-sm"
          >
            New Verification Code
          </button>
        </div>
      </div>
    </Form>
  );
};

export default Verify;
