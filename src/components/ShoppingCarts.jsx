// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { loadShoppingCarts } from '../store/ShoppingCarts';
// import { connect } from 'react-redux';

// class ShoppingCarts extends Component {
//   componentDidMount() {
//     this.props.loadShoppingCarts();
//   }

//   render() {
//     return (
//       <>
//         {this.props.shoppingCarts.map(shoppingCart => (
//           <li key={shoppingCart.id}>{shoppingCart.customerId}</li>
//         ))}
//       </>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   ShoppingCarts: state.entities.ShoppingCarts.list,
// });

// const mapDispatchToProps = dispatch => ({
//   loadShoppingCarts: () => dispatch(loadShoppingCarts()),
// });

// ShoppingCarts.propTypes = {
//   shoppingCarts: PropTypes.object.isRequired,
//   loadShoppingCarts: PropTypes.func,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCarts);
