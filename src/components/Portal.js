import { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("portal");

class Portal extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
    children: null
  };

  constructor(props) {
    super(props);
    this.element = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.element);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.element);
  }
}

export default Portal;
