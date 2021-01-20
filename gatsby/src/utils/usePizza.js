import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order
  const [order, setOrder] = useState([]);
  // 2. Make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function to remove things to order
  function removeFromOrder(index) {
    setOrder(order.filter((_, i) => i !== index));
  }
  // TODO
  // 4. Send this data to a serverless function when they checkout

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}