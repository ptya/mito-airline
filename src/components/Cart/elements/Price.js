import React from "react";
import PropTypes from "prop-types";
import { animated, useSpring } from "react-spring";

const Price = props => {
  const animation = useSpring({
    price: props.price
  });

  return (
    <animated.span>
      {animation.price.interpolate(x => `$${(x / 100).toFixed(0)}`)}
    </animated.span>
  );
};

Price.propTypes = {
  price: PropTypes.number.isRequired
};

export default Price;
