import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
  Row,
  Image,
  Table,
  Col,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

class AddToShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      count: 1,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
    this.decreaseCount = this.decreaseCount.bind(this);
  }

  componentDidMount() {}

  increaseCount() {
    console.log('inside increase count');
    const { count } = this.state;
    const newCount = count + 1;
    this.setState({ count: newCount });
    console.log(this.state.count);
  }

  decreaseCount() {
    const { count } = this.state;
    const newCount = count > 1 ? count - 1 : 1;
    this.setState({ count: newCount });
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  // TODO (pcg): implement add to shoppingCart button
  //   async handleSubmit(e) {
  //     e.preventDefault();
  //     this.hideModal();
  //   }

  render() {
    const { showing } = this.state;
    const { name, price } = this.props.menuItem;
    return (
      <React.Fragment>
        <Button onClick={this.showModal}>Add to shopping cart</Button>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Row>
              <Image
                src={`https://picsum.photos/id/${Math.floor(
                  Math.random() * 99
                )}/600/200`}
                fluid
              />
            </Row>
          </Modal.Header>
          <Modal.Body>
            <Table responsive>
              <tbody>
                <tr>
                  <td>Name: {name}</td>
                  <td>Price: {'$' + (price / 100).toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
            <Form name="menuItemAdd">
              <Form.Group controlId="specialnote">
                <Form.Label>Notes:</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Button variant="link" onClick={this.decreaseCount}>
                    <FontAwesomeIcon icon={faMinusCircle} size="1x" />
                  </Button>
                </Col>
                <Col xs="auto">
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="quantity"
                    htmlSize={1}
                    value={this.state.count}
                  />
                </Col>
                <Col>
                  <Button variant="link" onClick={this.increaseCount}>
                    <FontAwesomeIcon icon={faPlusCircle} size="1x" />
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button variant="outline-dark">Add to Shopping Cart</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

AddToShoppingCart.propTypes = {
  menuItem: PropTypes.object,
};

export default AddToShoppingCart;
