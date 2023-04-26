import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartCntxt from '../../store/cart-context'

const Cart = (props) => {
  const cartcntx = useContext(CartCntxt);

  const decreaseItemHandler = (name) => {
    cartcntx.removeItem(name);
  };
  

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartcntx.items.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.name === item.name);
        if (existingItem) {
          existingItem.quantity = Number(existingItem.quantity) + Number(item.quantity);
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []).map((item) => (
        <li key={item.name} className={classes['cart-item']}>
          <div>
            <h2>{item.name}</h2>
            <div className={classes.summary}>
              <span className={classes.price}>${item.price.toFixed(2)}</span>
              <span className={classes.amount}>x {item.quantity}</span>
            </div>
          </div>
          <div className={classes.actions}>
           <button onClick={() => decreaseItemHandler(item.name)}>−</button>
           <button onClick={() => cartcntx.addItem({ ...item, quantity: 1 })}>+</button>
          </div>
        </li>
      ))}
    </ul>
  );
  

  const totalPrice = cartcntx.items.reduce((totalPrice, item) => {
    return totalPrice + (parseInt(item.quantity) * item.price);
  }, 0);
  
  

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;