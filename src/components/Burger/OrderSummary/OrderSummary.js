import React from 'react';

import Aux from '../../../hoc/Auxiliar';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(key =>
      <li key={key}>
        <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
      </li>);

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delocious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" click={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" click={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;
