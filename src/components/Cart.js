import React from "react";
import PropTypes from "prop-types";

import "./styles/Cart.scss";

const Cart = props => {
  const { className } = props;
  const blockClass = `${className} cart`;
  return (
    <div className={blockClass}>
      <div className="cart__details">
        <div className="cart__header">
          <h2>Flights</h2>
          <h2>$29.98</h2>
        </div>
        <div className="cart__flight">
          <div className="cart__date">
            <p>Nov</p>
            <p>3</p>
          </div>
          <p className="cart__airport">
            <span>Budapest</span>
            <span>Barcelona El Prat</span>
            <span>Wed 06:02 – 07:35</span>
          </p>
        </div>
        <div className="cart__flight  cart__flight--separated">
          <div className="cart__date">
            <p>Nov</p>
            <p>4</p>
          </div>
          <p className="cart__airport">
            <span>Barcelona El Prat</span>
            <span>Budapest</span>
            <span>Wed 06:02 – 07:35</span>
          </p>
        </div>
        <div className="cart__total">
          <h2>Total</h2>
          <h2>$29.98</h2>
        </div>
      </div>
      <button type="button" className="cart__btn">
        Pay Now
      </button>
    </div>
  );
};

Cart.propTypes = {
  className: PropTypes.string
};

Cart.defaultProps = {
  className: null
};

export default Cart;
