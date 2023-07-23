import Form from "../formContainer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { savePaymentMethod } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckOutSteps from "./steps";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // formik
  const formik = useFormik({
    initialValues: {
      discount: "",
    },
    onSubmit: (values) => {
      dispatch(savePaymentMethod(values));
    },
    validationSchema: Yup.object({
      discount: Yup.number()
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
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  // redirect when shipping address is null
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
    if (Object.keys(paymentMethod).length > 0) {
      navigate("/order");
    }
  }, [navigate, shippingAddress, paymentMethod]);
  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-md-center">
        <div className="col-md-10 col-12">
          <CheckOutSteps />
          <h1 className="mb-5">Payment</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="row col-md-5 col-sm-10 col-12"
          >
            <div className="col-8">
              <input
                type="number"
                className={
                  formik.touched.discount && formik.errors.discount
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="discount"
                placeholder="Discount code..."
                onBeforeInput={formik.handleBlur}
                {...formik.getFieldProps("discount")}
              />
              {formik.touched.discount && formik.errors.discount ? (
                <div id="countryFeedback" className="invalid-feedback">
                  {formik.errors.discount}
                </div>
              ) : null}
            </div>
            <div className="col-4">
              <button type="submit" className="btn btn-primary w-100">
                Apply
              </button>
            </div>
          </form>
          <div className="row mt-5">
            <div className="col-12">
              <h2>
                You need to pay
                <b className="mx-2">
                  <span className="dollar">$</span>
                  {cartItems.reduce(
                    (total, item) =>
                      total + parseFloat(item.price) * parseInt(item.quantity),
                    0
                  )}
                </b>
                for{" "}
                <b>
                  {cartItems.reduce(
                    (total, item) => total + parseInt(item.quantity),
                    0
                  )}
                </b>{" "}
                items.
              </h2>
            </div>
            <div className="col-md-4 col-sm-10 col-12 mt-2">
              <button type="submit" className="btn btn-primary w-100">
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
