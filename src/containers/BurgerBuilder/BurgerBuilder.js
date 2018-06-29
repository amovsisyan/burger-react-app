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
import * as actionTypes from './../../store/actions'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount () {
        // this.getIngredients().then((ingredients) => {
        //     this.setState(
        //         {
        //             ingredients: ingredients.data
        //         }
        //     );
        // }).catch((e) => {
        //     this.setState(
        //         {
        //             error: true
        //         }
        //     );
        //     console.log(e);
        // });
    }

    getIngredients = async () => {
        // try {
        //     return await axios.get(
        //         '/ingredients.json'
        //     );
        // } catch (err) {
        //     console.error(err);
        //     return {};
        // }

    };

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
        this.props.history.push({
            pathname: '/checkout'
        });
    };

    render() {
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

        if (this.state.loading) {
            orderSummary = this.state.error ? <p>There is some problem</p> : <Spinner />;
        }

        let burger = this.state.error ? <p>There was error </p> : <Spinner/>;

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

const mapStateToProps = (state) =>  {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingrName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingrName}),
        onIngredientRemoved: (ingrName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingrName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));