import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((runningTotal, singleOrder) => {
    const orderedPizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
    return (
      runningTotal + calculatePizzaPrice(orderedPizza.price, singleOrder.size)
    );
  }, 0);
}
