import React, { useReducer } from "react";
import PropTypes from "prop-types";

import { CartContext, cartReducer, initialCart } from "../CartProvider";

const CartProvider = props => {
  const { state, reducer } = props;
  const [cart, cartDispatch] = useReducer(reducer, state);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartDispatch
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
  state: PropTypes.object,
  reducer: PropTypes.func
};

CartProvider.defaultProps = {
  state: initialCart,
  reducer: cartReducer
};

export default CartProvider;
