import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

// components
import CartFlight from "./Flight/CartFlight";
import CartModal from "./Modal/CartModal";

// context
import { CartContext } from "components/CartProvider";
import { StationsContext } from "components/StationsProvider";

// hooks
import { useSticky } from "components/hooks/useSticky";

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

  const {
    cart: { total, outbound, inbound }
  } = useContext(CartContext);

  const {
    stations: { origin, destination }
  } = useContext(StationsContext);

  const { area } = props;

  const isSticky = useSticky(100);

  return (
    <>
      <CartWrapper area={area} isSticky={isSticky}>
        <Header>
          Flights <Price price={total} />
        </Header>
        <AnimatedWrapper>
          {!outbound && <Info>Choose an outbound flight</Info>}
          {outbound && (
            <AnimatedFlight>
              <CartFlight
                isSeparated={false}
                flight={outbound}
                from={origin}
                to={destination}
              />
            </AnimatedFlight>
          )}
          {inbound && (
            <AnimatedFlight>
              <CartFlight
                isSeparated={outbound ? true : false}
                flight={inbound}
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
          disabled={outbound ? false : true}
          onClick={() => setPayToggle(true)}
        >
          Pay Now
        </PayBtn>
      </CartWrapper>
      {payToggle && <CartModal setToggle={setPayToggle} />}
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
