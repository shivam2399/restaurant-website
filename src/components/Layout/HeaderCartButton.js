import { useContext } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {
    const cartCntxt = useContext(CartContext);
    let quantity = 0;
    cartCntxt.items.forEach(item => {
        quantity += Number(item.quantity);
    })

    // const numberOfCartItems = cartCntx.items.reduce((currNumber, item) => {
    //     return currNumber + item.amount;
    // }, 0);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
              <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{quantity}</span>
        </button>
    )
}

export default HeaderCartButton;