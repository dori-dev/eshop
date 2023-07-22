import Form from "../formContainer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { saveShippingAddress } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../message";
import RingLoader from "react-spinners/RingLoader";
import { useFormik } from "formik";
import { override } from "../account/utils";
import * as Yup from "yup";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // formik
  const formik = useFormik({
    initialValues: {
      country: "",
      city: "",
      address: "",
      postalCode: "",
    },
    onSubmit: (values) => {
      dispatch(saveShippingAddress(values));
    },
    validationSchema: Yup.object({
      country: Yup.string()
        .max(50, "Country must be 50 characters or less")
        .min(2, "Country must be 2 characters or more")
        .required("Country field is required."),
      city: Yup.string()
        .max(50, "City must be 50 characters or less")
        .min(2, "City must be 2 characters or more")
        .required("City field is required."),
      address: Yup.string()
        .max(50, "Address must be 100 characters or less")
        .min(2, "Address must be 5 characters or more")
        .required("Address field is required."),
      postalCode: Yup.string()
        .max(10, "Postal Code must be 10 characters or less")
        .min(4, "Postal Code must be 4 characters or more")
        .required("Postal Code field is required."),
    }),
  });
  // redux
  const { shippingAddress } = useSelector((state) => state.cart);
  // redirect when shipping address is saved
  useEffect(() => {
    if (Object.keys(shippingAddress).length > 0) {
      navigate("/payment");
    }
  }, [navigate, shippingAddress]);
  return (
    <Form>
      <h1 className="mb-4">Shipping</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Country
          </label>
          <input
            type="text"
            className={
              formik.touched.country && formik.errors.country
                ? "form-control is-invalid"
                : "form-control"
            }
            id="country"
            placeholder="Enter your country"
            onBeforeInput={formik.handleBlur}
            {...formik.getFieldProps("country")}
          />
          {formik.touched.country && formik.errors.country ? (
            <div id="countryFeedback" className="invalid-feedback">
              {formik.errors.country}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            City
          </label>
          <input
            type="text"
            className={
              formik.touched.city && formik.errors.city
                ? "form-control is-invalid"
                : "form-control"
            }
            id="city"
            placeholder="Enter your city"
            onBeforeInput={formik.handleBlur}
            {...formik.getFieldProps("city")}
          />
          {formik.touched.city && formik.errors.city ? (
            <div id="cityFeedback" className="invalid-feedback">
              {formik.errors.city}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Address
          </label>
          <input
            type="text"
            className={
              formik.touched.address && formik.errors.address
                ? "form-control is-invalid"
                : "form-control"
            }
            id="address"
            placeholder="Enter your address"
            onBeforeInput={formik.handleBlur}
            {...formik.getFieldProps("address")}
          />
          {formik.touched.address && formik.errors.address ? (
            <div id="addressFeedback" className="invalid-feedback">
              {formik.errors.address}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Postal Code
          </label>
          <input
            type="text"
            className={
              formik.touched.postalCode && formik.errors.postalCode
                ? "form-control is-invalid"
                : "form-control"
            }
            id="postalCode"
            placeholder="Enter your postal code"
            onBeforeInput={formik.handleBlur}
            {...formik.getFieldProps("postalCode")}
          />
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div id="postalCodeFeedback" className="invalid-feedback">
              {formik.errors.postalCode}
            </div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Continue
        </button>
      </form>
    </Form>
  );
};

export default Shipping;
