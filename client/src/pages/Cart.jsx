import { Link } from "react-router-dom";
function Cart({ cart, increaseQuantity, decreaseQuantity, removeFromCart }) {
  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 && (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products"><button>Continue Shopping</button></Link>
        </div>
      )}

      {cart.map((product) => (
        <div className="cart-item" key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className="cart-info">
            <h3>{product.name}</h3>
            <p>${product.price}</p>


            <p>Quantity: {product.quantity}
              <button onClick={() => increaseQuantity(product.id)}>+</button>
              <button onClick={() => decreaseQuantity(product.id)}>-</button>
              <button className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</button>

            </p>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div>
          <h2 className="cart-total"> Cart Total: ${total.toFixed(2)}</h2>
          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </div>

      )}
    </main>
  );
}

export default Cart;