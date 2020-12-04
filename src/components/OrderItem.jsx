import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button, Table, Image } from 'react-bootstrap';

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
              Quantity : {quantity}
              <br />
              Price : {menuItem.price}
            </td>
          </tr>
        </tbody>
      </Table>
      {/* <Card style={{ width: '9rem' }}>
        <Card.Img
          variant="bottom"
          src={`https://picsum.photos/id/${Math.floor(Math.random() * 99)}/200`}
        />
        <Card.Body>
          <Card.Title>{menuItem.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {businessId}
          </Card.Subtitle>
          <Card.Text>
            {quantity} {specialNote}
            <br />
          </Card.Text>
          <Button variant="primary">Remove</Button>
        </Card.Body>
      </Card> */}
    </div>
  );
};

OrderItem.propTypes = {
  orderItem: PropTypes.object,
};

export default OrderItem;
