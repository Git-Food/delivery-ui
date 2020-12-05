import React from 'react';
import PropTypes from 'prop-types';

import { Table, Image } from 'react-bootstrap';

const OrderItem = props => {
  const { id, businessId, menuItem, quantity, specialNote } = props.orderItem;
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
              {/* Quantity : */}
              {/* <Button variant="link">
                <FontAwesomeIcon icon={faMinusCircle} size="1x" />
              </Button>
              {quantity}
              <Button variant="link" onClick={handleIncrease}>
                <FontAwesomeIcon icon={faPlusCircle} size="1x" />
              </Button> */}
              <br />
              Price : {menuItem.price}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

OrderItem.propTypes = {
  orderItem: PropTypes.object,
};

export default OrderItem;
