import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const calculateTotal = () =>
    items.reduce((sum, item) => sum + item.quantity * parseFloat(item.cost.substring(1)), 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.map(item => (
        <div key={item.name} className="cart-card">
          <img src={item.image} alt={item.name} />
          <h4>{item.name}</h4>
          <p>Unit Price: {item.cost}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleIncrement(item)}>+</button>
          <button onClick={() => handleDecrement(item)}>-</button>
          <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
          <p>Subtotal: ${item.quantity * parseFloat(item.cost.substring(1))}</p>
        </div>
      ))}
      <h3>Total: ${calculateTotal()}</h3>
      <button onClick={() => alert('Checkout functionality coming soon.')}>Checkout</button>
    </div>
  );
}
export default CartItem;


