import React, { useContext } from "react";
import PropTypes from "prop-types";

// components
import CartFlight from "../Flight/CartFlight";

// context
import { CartContext } from "components/providers/CartProvider";
import { StationsContext } from "components/providers/StationsProvider";

// utils
import { formatMoney } from "utils/formatMoney";

// global elements
import Modal from "components/elements/Modal";

// local elements
import Header from "./elements/Header";
import FlightsWrapper from "./elements/FlightsWrapper";
import Footer from "./elements/Footer";
import CancelBtn from "./elements/CancelBtn";

const CartModal = props => {
  const { setToggle, animation } = props;
  const { cart, cartDispatch } = useContext(CartContext);
  const {
    stations: { origin, destination }
  } = useContext(StationsContext);

  const handleReset = () => {
    setToggle(false);
    cartDispatch({
      type: "purge"
    });
  };

  const { total } = cart;

  return (
    <Modal setToggle={setToggle} animation={animation}>
      <Header>Thanks for buying your tickets at Mito Airlines</Header>
      <FlightsWrapper>
        <CartFlight flight={cart.outbound} from={origin} to={destination} />
        {cart.inbound && (
          <CartFlight flight={cart.inbound} from={destination} to={origin} />
        )}
      </FlightsWrapper>
      <Footer>
        <h2>
          TOTAL: <span>{formatMoney(total)}</span>
        </h2>
        <CancelBtn type="button" onClick={() => handleReset()}>
          No, thanks (reset)
        </CancelBtn>
      </Footer>
    </Modal>
  );
};

CartModal.propTypes = {
  setToggle: PropTypes.func.isRequired,
  animation: PropTypes.object.isRequired
};

export default CartModal;
