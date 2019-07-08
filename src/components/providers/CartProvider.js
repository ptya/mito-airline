import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

const initialCart = {
  inbound: null,
  inboundPrice: 0,
  inboundFare: "",
  outbound: null,
  outboundPrice: 0,
  outboundFare: "",
  total: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "setInbound":
      return {
        ...state,
        inbound: action.flight,
        inboundPrice: action.price,
        inboundFare: action.fare,
        total: state.outboundPrice + action.price
      };
    case "setOutbound":
      return {
        ...state,
        outbound: action.flight,
        outboundPrice: action.price,
        outboundFare: action.fare,
        total: state.inboundPrice + action.price
      };
    case "purge":
      return initialCart;
    default:
      return state;
  }
};

const CartProvider = props => {
  const [cart, cartDispatch] = useReducer(cartReducer, initialCart);

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
  children: PropTypes.node.isRequired
};

export default CartProvider;
export { CartContext, cartReducer, initialCart };
