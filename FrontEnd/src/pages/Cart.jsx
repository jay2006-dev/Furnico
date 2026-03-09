import { useContext } from "react";
import CartContext from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Cart is empty...</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            <h4>{item.name}</h4>
            <p>Price :${item.price}</p>
            <p>Quantity : {item.quantity}</p>

            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
              -
            </button>
            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
              +
            </button>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
            {/* <hr /> */}
            <p>Total Items : {totalItems}</p>
            <p>Total Price : ${totalPrice}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
