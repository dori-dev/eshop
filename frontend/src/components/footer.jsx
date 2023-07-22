const Footer = () => {
  return ( <>
    <footer className="bg-light text-center text-lg-start mt-5 fixed-bottom">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-0 mb-md-4">
            <h5 className="text-uppercase">Shop</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">link 1</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 2</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 3</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 4</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-0 mb-md-4">
            <h5 className="text-uppercase mb-0">Products</h5>
            <ul className="list-unstyled mt-2">
              <li>
                <a href="#!" className="text-dark">link 1</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 2</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 3</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 4</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Blog</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">link 1</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 2</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 3</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 4</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">About</h5>
            <ul className="list-unstyled mt-2">
              <li>
                <a href="#!" className="text-dark">link 1</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 2</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 3</a>
              </li>
              <li>
                <a href="#!" className="text-dark">link 4</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
         © E-Shop 2023
      </div>
    </footer></> );
}
 
export default Footer;

