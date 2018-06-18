import React from 'react';
import ReactAux from '../../../hoc/ReactAux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey) => {
            return (
                <li key={igKey}>
                    <span
                        style={{textTransform: 'capitalize'}}
                    >
                        {igKey}
                    </span>: {props.ingredients[igKey]}
                </li>
            )
        });

    return (
        <ReactAux>
            <h3>Your Order</h3>
            <p>A delicios burger</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: {props.totalPrice.toFixed(2)}</p>
            <p>Continue to checkout ?</p>
            <Button
                btnType={'Danger'}
                clicked={props.purchaseCanceled}
            >
                Cancel
            </Button>

            <Button
                btnType={'Success'}
                clicked={props.purchaseContinued}
            >
                Continue
            </Button>
        </ReactAux>
    );
};

export default orderSummary;