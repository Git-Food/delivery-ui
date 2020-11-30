import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDeliveries } from "../store/deliveries";

// Sample Deliveries function made with hooks
const DeliveriesList = () => {
  const dispatch = useDispatch();
  const deliveries = useSelector((state) => state.entities.deliveries.list);
  useEffect(() => {
    dispatch(loadDeliveries());
  });
  return (
    <ul>
      {deliveries.map((delivery) => (
        <li key={delivery.id}>{delivery.title}</li>
      ))}
    </ul>
  );
};

export default DeliveriesList;
