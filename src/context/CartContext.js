import { createContext, useState, useEffect } from "react";

export const  CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Error Parsing cart from localstorage", error)
            }
        }
    }, []);

    useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems"); // clean storage when empty
    }
  }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) => 
                    item.id === product.id

                ? {...item, quantity: item.quantity + 1} : item
              );
            } else {
                return [...prev, {...product, quantity: 1}];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.map((item) => item.id === id ? {...item, quantity: item.quantity - 1 } : item 
       )
       .filter((item) => item.quantity > 0)
    );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cartItems");
    };

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart}} >
            {children}
        </CartContext.Provider>
    );
};
