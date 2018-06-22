import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
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
            customer: {
                name: 'Haykaz',
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

    render() {
        let form = (
                <form>
                    <input type="text" name="name" placeholder={'Your Name'}/>
                    <input type="email" name="email" placeholder={'Your Email'}/>
                    <input type="text" name="street" placeholder={'Your Street'}/>
                    <input type="text" name="postal" placeholder={'Your Postal Code'}/>
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