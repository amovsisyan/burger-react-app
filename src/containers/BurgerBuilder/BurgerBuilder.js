import React, {Component} from 'react';
import ReactAux from '../../hoc/ReactAux/ReactAux'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount () {
        this.getIngredients().then((ingredients) => {
            this.setState(
                {
                    ingredients: ingredients.data
                }
            );
        }).catch((e) => {
            this.setState(
                {
                    error: true
                }
            );
            console.log(e);
        });
    }

    getIngredients = async () => {
        try {
            return await axios.get(
                '/ingredients.json'
            );
        } catch (err) {
            console.error(err);
            return {};
        }

    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        );

        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState(
            {
                purchasable: sum > 0
            }
        )
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        if (oldCount > 0) {
            updatedIngredients[type] = oldCount - 1;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;

            this.setState(
                {
                    totalPrice: newPrice,
                    ingredients: updatedIngredients
                }
            );
        }

        this.updatePurchaseState(updatedIngredients);
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
        this.setState(
            {
                loading: true
            }
        );
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Arthur',
                address: {
                    street: 'mount',
                    country: 'german'
                },
                email: 'my@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        try {
            const response = await axios.post(
                '/orders.json',
                order
            );
            this.setState(
                {
                    loading: false,
                    purchasing: false
                }
            );
            console.log(response);
        } catch (e) {
            this.setState(
                {
                    loading: false,
                    purchasing: false
                }
            );
            console.log('Error', e);
        }
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
        />;

        if (this.state.loading) {
            orderSummary = this.state.error ? <p>There is some problem</p> : <Spinner />;
        }

        let burger = this.state.error ? <p>There was error </p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <ReactAux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        disabled={disableInfo}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder, axios);