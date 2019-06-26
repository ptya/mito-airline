import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import Modal from "components/Modal";
import Flight from "components/Flight";
import { CartContext } from "components/CartProvider";
import { StationsContext } from "components/StationsProvider";

import { useSticky } from "components/hooks/useSticky";
import { formatMoney } from "utils/formatMoney";

import Price from "./elements/Price";

// local elements
import Header from "./elements/Header";
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
      <div className={blockClass}>
        <div className="cart__details">
          <Header>
            Flights <Price price={total} />
          </Header>
          {!cart.outbound && (
            <p className="cart__info">Choose an outbound flight</p>
          )}
          {cart.outbound && (
            <Flight flight={cart.outbound} from={origin} to={destination} />
          )}
          {cart.inbound && (
            <Flight
              className={cart.outbound ? "cart__separator" : ""}
              flight={cart.inbound}
              from={destination}
              to={origin}
            />
          )}
          <Total>
            Total <Price price={total} />
          </Total>
        </div>
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
      </div>
      {payToggle && (
        <Modal setToggle={setPayToggle}>
          <div className="pay-view">
            <h1 className="pay-view__header">
              Thanks for buying your tickets at mito airlines
            </h1>
            <div className="pay-view__flights">
              <Flight flight={cart.outbound} from={origin} to={destination} />
              {cart.inbound && (
                <Flight flight={cart.inbound} from={destination} to={origin} />
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
