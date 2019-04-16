import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Flight from "./Flight";

import { convertDate } from "../utils/convertDate";

import "./styles/Cart.scss";

const Cart = props => {
  const [payToggle, setPayToggle] = useState(false);

  const { className } = props;
  const blockClass = `${className} cart`.trim();

  convertDate();

  return (
    <>
      <div className={blockClass}>
        <div className="cart__details">
          <h2 className="cart__header">
            Flights <span className="cart__header--price">$29.98</span>
          </h2>
          <Flight date={{ month: "apr", day: 16 }} />
          <Flight
            className="cart__separator"
            date={{ month: "apr", day: 17 }}
          />
          <h2 className="cart__total">
            Total <span>$29.98</span>
          </h2>
        </div>
        <button
          type="button"
          className="cart__btn"
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
              <Flight date={{ month: "apr", day: 16 }} />
              <Flight date={{ month: "apr", day: 16 }} />
            </div>
            <div className="pay-view__footer">
              <h2 className="pay-view__total">
                TOTAL: <span className="pay-view__total--amount">$9.99</span>
              </h2>
              <button
                className="pay-view__cancel"
                type="button"
                onClick={() => setPayToggle(false)}
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
