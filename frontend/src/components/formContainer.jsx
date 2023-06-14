const Form = ({ children }) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-md-center">
        <div className="col-md-6 col-12">{children}</div>
      </div>
    </div>
  );
};

export default Form;
