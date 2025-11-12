import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CheckOut.css"

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    if (cartItems.length === 0) {
        return (
            <div className="checkout-empty">
                <h2>Your Cart Is Empty</h2>
                <button onClick={() => navigate("/")} >Go Shopping</button>
            </div>
        );
    }

    const handleConfirm = () => {
        alert("🎉 Order placed successfully!");
        clearCart();
    };

    return (
        <div className="checkout-container">
            <h1>Order Summary</h1>

            <ul className="checkout-list">
                {cartItems.map((item) =>  (
                    <li key={item.id} className="checkout-item" >
                        <img src={item.image} alt={item.name} className="checkout-img" />
                        <div className="checkout-details">
                            <h4>{item.title}</h4>
                            <p>Price: ₹{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Subtotal: ₹{item.price * item.quantity}.toFixed(2)</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="checkout-total">
                <h3 className="">Total Amount: ₹{totalPrice.toFixed(2)}</h3>
                <button className="confirm-btn" onClick={handleConfirm} >
                    Confirm Order
                </button>
            </div>
        </div>
    )
}

export default Checkout