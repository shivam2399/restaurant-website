import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = props => {
    const [items, setItems] = useState([]);
    
    const addItemToCartHandler = item => {
        setItems([...items, item]);
    };

    const removeItemFromCartHandler = id => {
        const itemIndex = items.findIndex(item => item.id === id);
        const item = items[itemIndex];
      
        if (item.quantity > 1) {
          const newItems = [...items];
          newItems[itemIndex] = { ...item, quantity: item.quantity - 1 };
          setItems(newItems);
        } else {
          const newItems = items.filter(item => item.id !== id);
          setItems(newItems);
        }
    };
      
    
    const cartContext = {
        items: items,
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;