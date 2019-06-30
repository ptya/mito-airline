import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import CartFlight from "./Flight/CartFlight";
import { CartContext } from "components/CartProvider";
import { StationsContext } from "components/StationsProvider";

import { useSticky } from "components/hooks/useSticky";

// global elements
import Modal from "components/elements/Modal";

// local elements
import Price from "./elements/Price";
import AnimatedWrapper from "./elements/AnimatedWrapper";
import AnimatedFlight from "./elements/AnimatedFlight";
import CartWrapper from "./elements/CartWrapper";
import Header from "./elements/Header";
import Info from "./elements/Info";
import Total from "./elements/Total";
import PayBtn from "./elements/PayBtn";

const Cart = props => {
  const [payToggle, setPayToggle] = useState(false);
  const { cart, cartDispatch } = useContext(CartContext);
  const {
    stations: { origin, destination }
  } = useContext(StationsContext);

  const handleReset = () => {
    setPayToggle(false);
    cartDispatch({
      type: "purge"
    });
  };

  const { area } = props;

  const { total } = cart;

  const isSticky = useSticky(100);

  return (
    <>
      <CartWrapper area={area} isSticky={isSticky}>
        <Header>
          Flights <Price price={total} />
        </Header>
        <AnimatedWrapper>
          {!cart.outbound && <Info>Choose an outbound flight</Info>}
          {cart.outbound && (
            <AnimatedFlight>
              <CartFlight
                isSeparated={false}
                flight={cart.outbound}
                from={origin}
                to={destination}
              />
            </AnimatedFlight>
          )}
          {cart.inbound && (
            <AnimatedFlight>
              <CartFlight
                isSeparated={cart.outbound ? true : false}
                flight={cart.inbound}
                from={destination}
                to={origin}
              />
            </AnimatedFlight>
          )}
        </AnimatedWrapper>
        <Total>
          Total <Price price={total} />
        </Total>
        <PayBtn
          type="button"
          disabled={cart.outbound ? false : true}
          onClick={() => setPayToggle(true)}
        >
          Pay Now
        </PayBtn>
      </CartWrapper>
      {payToggle && (
        <Modal setToggle={setPayToggle}>
          <div className="pay-view">
            <h1 className="pay-view__header">
              Thanks for buying your tickets at Mito Airlines
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
  area: PropTypes.string
};

Cart.defaultProps = {
  area: null
};

export default Cart;
