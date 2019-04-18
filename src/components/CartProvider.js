import React, { createContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "setInbound":
      return {
        ...state,
        inbound: action.flight,
        inboundPrice: action.price,
        total: state.outboundPrice + action.price
      };
    case "setOutbound":
      return {
        ...state,
        outbound: action.flight,
        outboundPrice: action.price,
        total: state.inboundPrice + action.price
      };
    case "purgeInbound":
      return {
        ...state,
        inbound: null,
        inboundPrice: 0,
        total: state.outboundPrice
      };
    case "purgeOutbound":
      return {
        ...state,
        outbound: null,
        outboundPrice: 0,
        total: state.inboundPrice
      };
    default:
      return state;
  }
};

const initialCart = {
  inbound: null,
  inboundPrice: 0,
  outbound: null,
  outboundPrice: 0,
  total: 0
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

export default CartProvider;
export { CartContext };
