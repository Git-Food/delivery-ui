import React from 'react';
import PropTypes from 'prop-types';

import { Button, Table, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const OrderItem = props => {
  const { menuItem, quantity, specialNote } = props.orderItem;
  return (
    <div>
      <Table responsive>
        <tbody>
          <tr>
            <td>
              <Image
                src={`https://picsum.photos/id/${Math.floor(
                  Math.random() * 99
                )}/200`}
                rounded
              />
            </td>
            <td>
              {menuItem.name}
              <br />
              Quantity :
              <Button
                variant="link"
                onClick={() =>
                  props.onDecrement(props.orderItem, props.userid)
                }>
                <FontAwesomeIcon icon={faMinusCircle} size="1x" />
              </Button>
              {quantity}
              {/** Takes the onClick from the ShoppingCart component as props */}
              <Button
                variant="link"
                onClick={() =>
                  props.onIncrement(props.orderItem, props.userid)
                }>
                <FontAwesomeIcon icon={faPlusCircle} size="1x" />
              </Button>
              <br />
              Unit price: {'$' + (menuItem.price / 100).toFixed(2)}
              <br />
              Order item total:
              {` $ ${((menuItem.price / 100) * quantity).toFixed(2)}`}
              <br />
              Notes: {specialNote}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

OrderItem.propTypes = {
  orderItem: PropTypes.object,
  userid: PropTypes.string,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
};

export default OrderItem;
