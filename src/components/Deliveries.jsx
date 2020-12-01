import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { loadDeliveries } from '../store/deliveries';
import { connect } from 'react-redux';

// Sample Deliveries component made with React component
class Deliveries extends Component {
  componentDidMount() {
    this.props.loadDeliveries();
  }

  render() {
    return (
      <ul>
        {this.props.deliveries.map(delivery => (
          <li key={delivery.id}>{delivery.title}</li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  deliveries: state.entities.deliveries.list,
});

const mapDispatchToProps = dispatch => ({
  loadDeliveries: () => dispatch(loadDeliveries()),
});

Deliveries.propTypes = {
  deliveries: PropTypes.array,
  loadDeliveries: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries);
