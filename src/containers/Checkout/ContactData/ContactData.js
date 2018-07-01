import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true,
                    inputLength: {
                        min: 4,
                        max: 5
                    }
                },
                touched: false,
                valid: false,
                shouldValidate: true,
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                validation: {
                    required: true
                },
                touched: false,
                valid: false,
                shouldValidate: true,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                validation: {
                    required: true
                },
                touched: false,
                valid: false,
                shouldValidate: true,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                validation: {
                    required: true
                },
                touched: false,
                valid: false,
                shouldValidate: true,
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                validation: {},
                valid: true,
                touched: false,
                shouldValidate: false,
                value: 'fastest'
            }
        },
        isFormValid: false
    };

    orderHandler = async (event) => {
        event.preventDefault();
        const formData = {};

        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };
        this.props.onOrderBurger(order);
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = (value.trim() !== '') && isValid;
        }

        if (rules.inputLength) {
            if (rules.inputLength.min) {
                isValid = (value.length >= rules.inputLength.min) && isValid;
            }

            if (rules.inputLength.max) {
                isValid = (value.length <= rules.inputLength.max) && isValid;
            }
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const orderForm = {...this.state.orderForm};
        const orderFormElement = {...orderForm[inputIdentifier]};
        orderFormElement.value = event.target.value;
        orderFormElement.valid = this.checkValidity(orderFormElement.value, orderFormElement.validation);
        orderFormElement.touched = true;
        orderForm[inputIdentifier] = orderFormElement;

        let isFormValid = true;
        for (let element in orderForm) {
            isFormValid = orderForm[element].valid && isFormValid;
        }

        this.setState(
            {
                orderForm: orderForm,
                isFormValid: isFormValid
            }
        );
    }

    render() {
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            );
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElements.map((formElement) => {
                        return <Input
                            key={formElement.id}
                            change={(event) => this.inputChangeHandler(event, formElement.id)}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.shouldValidate}
                        />
                    })
                }
                <Button
                    btnType={"Success"}
                    clicked={this.orderHandler}
                    disabled={!this.state.isFormValid}
                >
                    Order
                </Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        loading: state.orderReducer.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);