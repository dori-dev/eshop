import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getUserDetailsAction,
  updateUserProfileAction,
} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../message";
import RingLoader from "react-spinners/RingLoader";
import { UPDATE_PROFILE } from "../../constants/userConstants";

const override = {
  display: "block",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#111",
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // redux
  const { userInfo } = useSelector((state) => state.user);
  const { user, error, loading } = useSelector((state) => state.userDetails);
  const {
    error: updateError,
    success,
    loading: updateLoading,
  } = useSelector((state) => state.updateProfile);
  // local states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setUpdatedMessage("");
    if (password && password !== password2) {
      setMessage("Password and confirm password don't match!");
    } else {
      const data = {
        id: user.id,
        first_name: name,
        email: email,
      };
      if (password) {
        data.password = password;
      }
      dispatch(updateUserProfileAction(data));
    }
  };
  useEffect(() => {
    if (userInfo) {
      if (success) {
        setUpdatedMessage("Profile updated successfully!");
      }
      if (!user || !user.name || success) {
        dispatch({ type: UPDATE_PROFILE.RESET });
        setPassword("");
        setPassword2("");
        setMessage("");
        dispatch(getUserDetailsAction());
      } else {
        setEmail(user.email);
        setName(user.name);
      }
    } else {
      navigate("/login");
    }
  }, [userInfo, navigate, user, dispatch, success]);
  return (
    <>
      <div className="m-3">
        {error && <Message variant="danger" message={error} />}
        {updateError && <Message variant="danger" message={updateError} />}
        {updatedMessage && (
          <Message variant="success" message={updatedMessage} closable={true} />
        )}
      </div>
      <div className="row container-fluid g-5">
        <div className="col-md-4">
          <div className="row justify-content-md-center">
            <h1 className="mb-4">Profile</h1>
            {loading || updateLoading ? (
              <RingLoader
                color="#000"
                loading={loading || updateLoading}
                cssOverride={override}
                size={150}
                aria-label="Loading"
              />
            ) : (
              <></>
            )}
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
                />
              </div>
              <div className="mb-3 mt-2">
                <label htmlFor="password2" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={
                    message ? "form-control is-invalid" : "form-control"
                  }
                  id="password2"
                  placeholder="Enter your password again"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <div id="password2Feedback" className="invalid-feedback">
                  {message}
                </div>
              </div>
              <button
                className={
                  loading || updateLoading
                    ? "btn btn-primary w-100 disabled"
                    : "btn btn-primary w-100"
                }
              >
                Update
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">all orders</div>
      </div>
    </>
  );
};

export default Profile;
