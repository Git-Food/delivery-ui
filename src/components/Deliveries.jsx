import React, { Component } from "react";
import { loadDeliveries } from "../store/deliveries";
import { connect } from "react-redux";

// Sample Deliveries component made with React component
class Deliveries extends Component {
  componentDidMount() {
    this.props.loadDeliveries();
  }

  render() {
    return (
      <ul>
        {this.props.deliveries.map((delivery) => (
          <li key={delivery.id}>{delivery.title}</li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  deliveries: state.entities.deliveries.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadDeliveries: () => dispatch(loadDeliveries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries);
