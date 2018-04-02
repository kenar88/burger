import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm: {            
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },                
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            index: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Index',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },            
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail',
                },
                value: '',
                validation: {
                    required: true               
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ] 
                },
                value: 'Fastest',
                validation: {},
                valid: true
            },
        },
        loading: false,
        formIsValid: false,
    }

    orderHndler = (event) => {
        event.preventDefault();
        console.log(this.props);                
        this.setState({ loading: true });
        const formData = {};

        for ( let formIdent in this.state.orderForm) {
            formData[formIdent] = this.state.orderForm[formIdent].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            formData: formData,
    }
    axios.post('/orders.json', order)
        .then( response => {          
          this.setState({loading: false, });
          this.props.history.push('/');
         })
        .catch( error => {
          this.setState({loading: false, });
        });
    }

    checkValidity(value, rules) {
        let isValid = false;

        if ( rules.required ) {
            isValid = value.trim() !== '';
        }
        if ( rules.minLength && rules.maxLength ) {
            isValid = value.length === 6;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedInputValue = {
            ...updatedOrderForm[inputId]
        };
        updatedInputValue.value = event.target.value;
        updatedInputValue.valid = this.checkValidity(updatedInputValue.value, updatedInputValue.validation);
        updatedOrderForm[inputId] = updatedInputValue;
        updatedInputValue.touched = true;
        
        let formIsValid = true;
        for ( let inputIndent in updatedOrderForm ) {
            formIsValid = updatedOrderForm[inputIndent].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});       
    }

    render () {
        const formElementsArray = [];

        for ( let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
        <form onSubmit={this.orderHndler}>
            {formElementsArray.map(formElement => (
                <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    key={formElement.id}
                    shouldValid={formElement.config.validation}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)} />
            ))}
            <Button disabled={!this.state.formIsValid} btnType='Success' clicked={this.orderHndler}>ORDER</Button>
        </form>
        );

        if (  this.state.loading ) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);