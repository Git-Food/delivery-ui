import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

const MenuItem = props => {
  return (
    <div>
      <Card body inverse color="info">
        <CardBody>
          <CardTitle tag="h5">{props.item.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {props.item.description}
          </CardSubtitle>
        </CardBody>
        <CardBody>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <CardLink href="#">Card Link</CardLink>
          <CardLink href="#">Another Link</CardLink>
        </CardBody>
      </Card>
    </div>
  );
};

export default MenuItem;
