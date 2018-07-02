import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactAux from '../../hoc/ReactAux/ReactAux'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';

import * as orderActions from '../../store/order/actions';
import * as orderSelectors from '../../store/order/selectors';

import * as asd from '../../store/order/actions';
import * as ads from '../../store/order/selectors';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
        this.props.onInitOrder();
    }

    updatePurchaseState = () => {
        const sum = Object.keys(this.props.ings)
            .map((igKey) => {
                return this.props.ings[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0
    };

    purchaseHandler = () => {
        this.setState(
            {
                purchasing: true
            }
        );
    };

    purchaseCancelHandler = () => {
        this.setState(
            {
                purchasing: false
            }
        );
    };

    purchaseContinueHandler = async () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout'
        });
    };

    render() {
        console.log(this.props);
        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.props.price}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
        />;

        let burger = this.props.error ? <p>There was error </p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <ReactAux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        disabled={disableInfo}
                        ingredientAdded={(ingrType) => this.props.onIngredientAdded(ingrType)}
                        ingredientRemoved={(ingrType) => this.props.onIngredientRemoved(ingrType)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState()}
                    />
                </ReactAux>
            );
        }


        return (
            <ReactAux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </ReactAux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        init: orderSelectors.getInitOrder(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingrName) => dispatch(actions.addIngredient(ingrName)),
        onIngredientRemoved: (ingrName) => dispatch(actions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onInitOrder: () => dispatch(orderActions.initOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));