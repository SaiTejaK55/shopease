import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {

    const { cartItems , removeFromCart, addToCart } = useContext(CartContext);
    const navigate = useNavigate()

    if (cartItems.length === 0) {
        return <h2>Your Cart is empty</h2>
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0 );

    return (
        <div className="cart-container">
            <h2>Your cart</h2>
                <ul className="cart-list">
                    {cartItems.map((item) => (
                        <li key={item.id} className='cart-item' >
                            <img src={item.image} alt={item.title} className="cart-img" />
                            <div  className="cart-details">
                                <h4 className="cart-title">{item.title}</h4>
                                <p className="cart-price">₹{item.price}</p>

                                <div className="quantity-section">
                                  <button onClick={() => removeFromCart(item.id)} className="qty-btn">-</button>
                                  <span className="qty-display">{item.quantity}</span>
                                  <button onClick={() => addToCart(item)} className="qty-btn">+</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='total-section'>
                    <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
                    <button className="checkout-btn" onClick={() => navigate("/checkout")} >Proceed to Checkout</button>
                </div>

        </div>
        
    );
}

export default Cart