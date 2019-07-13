import { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

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
    this.element.dataset.testid = "my-portal";
  }

  componentDidMount() {
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    this.element.parentNode.removeChild(this.element);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.element);
  }
}

export default Portal;
