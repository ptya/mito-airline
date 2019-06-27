import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import Modal from "components/Modal";
import CartFlight from "./Flight/CartFlight";
import { CartContext } from "components/CartProvider";
import { StationsContext } from "components/StationsProvider";

import { useSticky } from "components/hooks/useSticky";
import { formatMoney } from "utils/formatMoney";

import Price from "./elements/Price";

// local elements
import CartWrapper from "./elements/CartWrapper";
import Header from "./elements/Header";
import Info from "./elements/Info";
import Total from "./elements/Total";

const Cart = props => {
  const [payToggle, setPayToggle] = useState(false);
  const { cart, cartDispatch } = useContext(CartContext);
  const { origin, destination } = useContext(StationsContext);

  const handleReset = () => {
    setPayToggle(false);
    cartDispatch({
      type: "purge"
    });
  };

  const { className } = props;

  // const total = formatMoney(cart.total);
  const { total } = cart;

  const isSticky = useSticky(100);

  const blockClass = isSticky
    ? `${className} cart cart--fixed`.trim()
    : `${className} cart`.trim();

  return (
    <>
      {/* <div className={blockClass}>
        <div className="cart__details"> */}
      <CartWrapper>
        <Header>
          Flights <Price price={total} />
        </Header>
        {!cart.outbound && <Info>Choose an outbound flight</Info>}
        {cart.outbound && (
          <CartFlight flight={cart.outbound} from={origin} to={destination} />
        )}
        {cart.inbound && (
          <CartFlight
            className={cart.outbound ? "cart__separator" : ""}
            flight={cart.inbound}
            from={destination}
            to={origin}
          />
        )}
        <Total>
          Total <Price price={total} />
        </Total>
        <button
          type="button"
          className={
            cart.outbound ? "cart__btn" : "cart__btn cart__btn--disabled"
          }
          disabled={cart.outbound ? false : true}
          onClick={() => setPayToggle(true)}
        >
          Pay Now
        </button>
      </CartWrapper>
      {payToggle && (
        <Modal setToggle={setPayToggle}>
          <div className="pay-view">
            <h1 className="pay-view__header">
              Thanks for buying your tickets at mito airlines
            </h1>
            <div className="pay-view__flights">
              <CartFlight
                flight={cart.outbound}
                from={origin}
                to={destination}
              />
              {cart.inbound && (
                <CartFlight
                  flight={cart.inbound}
                  from={destination}
                  to={origin}
                />
              )}
            </div>
            <div className="pay-view__footer">
              <h2 className="pay-view__total">
                TOTAL: <span className="pay-view__total--amount">{total}</span>
              </h2>
              <button
                className="pay-view__cancel"
                type="button"
                onClick={() => handleReset()}
              >
                No, thanks (reset)
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

Cart.propTypes = {
  className: PropTypes.string
};

Cart.defaultProps = {
  className: ""
};

export default Cart;
