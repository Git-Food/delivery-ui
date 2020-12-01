import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { loadMenus } from '../store/menus';
import { connect } from 'react-redux';

import Menu from './Menu';

class Menus extends Component {
  componentDidMount() {
    this.props.loadMenus();
  }

  render() {
    return (
      <>
        {this.props.menus.map(menu => (
          <Menu key={menu.id} menu={menu} />
        ))}
      </>
    );
  }
}

const mapStateToProps = state => ({
  menus: state.entities.menus.list,
});

const mapDispatchToProps = dispatch => ({
  loadMenus: () => dispatch(loadMenus()),
});

Menus.propTypes = {
  menus: PropTypes.array,
  loadMenus: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
