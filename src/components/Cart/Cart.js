import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useTransition, config } from "react-spring";

// components
import CartFlight from "./Flight/CartFlight";
import CartModal from "./Modal/CartModal";

// context
import { CartContext } from "components/providers/CartProvider";
import { StationsContext } from "components/providers/StationsProvider";

// hooks
import { useSticky } from "components/hooks/useSticky";

// local elements
import Price from "./elements/Price";
import AnimatedWrapper from "./elements/AnimatedWrapper";
import AnimatedFlight from "./elements/AnimatedFlight";

// local styles
import CartWrapper from "./styles/CartWrapper";
import Header from "./styles/Header";
import Info from "./styles/Info";
import PayBtn from "./styles/PayBtn";
import Total from "./styles/Total";

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

  // modal animation
  const transition = useTransition(payToggle, null, {
    from: { opacity: 0, transform: "translate3d(0, -40px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    config: { config: config.stiff }
  });

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
      {transition.map(
        ({ item: toggle, key, props: animation }) =>
          toggle && (
            <CartModal
              key={key}
              setToggle={setPayToggle}
              animation={animation}
            />
          )
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
