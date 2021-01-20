import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const orderedPizza = pizzas.find(
          (pizza) => pizza.id === singleOrder.id
        );
        return (
          <MenuItemStyles key={singleOrder.id}>
            <Img fluid={orderedPizza.image.asset.fluid} />
            <h2>{orderedPizza.name}</h2>
            <p>
              {formatMoney(
                calculatePizzaPrice(orderedPizza.price, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} from order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}