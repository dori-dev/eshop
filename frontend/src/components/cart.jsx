import { useParams } from "react-router-dom";

const Cart = () => {
  const { id, quantity } = useParams();
  return (
    <>
      <h1>Cart</h1>
      <p>{id}</p>
      <p>{quantity}</p>
      <div style={{ marginBottom: "1000px" }}></div>
    </>
  );
};

export default Cart;
