import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
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
                value: ''
            }
        },


        loading: false
    }

    orderHandler = async (event) => {
        this.setState(
            {
                loading: true
            }
        );
        event.preventDefault();

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        };
        try {
            const response = await axios.post(
                '/orders.json',
                order
            );
            this.setState(
                {
                    loading: false
                }
            );
            this.props.history.push('/');
        } catch (e) {
            this.setState(
                {
                    loading: false
                }
            );
            console.log('Error', e);
        }
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const orderForm = {...this.state.orderForm};
        const orderFormElement = {...orderForm[inputIdentifier]};
        orderFormElement.value = event.target.value;
        orderForm[inputIdentifier] = orderFormElement;
        this.setState(
            {
                orderForm: orderForm
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
            <form>
                {
                    formElements.map((formElement) => {
                        return <Input
                            key={formElement.id}
                            change={(event) => this.inputChangeHandler(event, formElement.id)}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                        />
                    })
                }
                <Button btnType={"Success"} clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if (this.state.loading) {
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

export default withRouter(ContactData);