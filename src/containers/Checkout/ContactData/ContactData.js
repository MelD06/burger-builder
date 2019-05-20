import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
            required: true,
            minLength: 3
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your EMail"
        },
        value: "",
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {
    };
    for(let formIdent in this.state.orderForm){
        formData[formIdent] = this.state.orderForm[formIdent].value;
    }
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      orderData: formData,
      price: this.props.price // !!! not safe as price is managed on the user-side
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if(!rules){
        return true;
    }
    if(rules.required){
        isValid = (value.trim() !== '') && isValid;
    }
    if(rules.minLength){
        isValid = (value.length >= rules.minLength) && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {...this.state.orderForm};
    const updatedElement = {...updatedForm[inputIdentifier]};
    updatedElement.value = event.target.value;
    updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
    updatedElement.touched = true;
    updatedForm[inputIdentifier] = updatedElement;

    let formIsValid = true;
    for(let inputIdentifier in updatedForm){
        formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    console.log(formIsValid);

    this.setState({
        orderForm: updatedForm,
        formIsValid: formIsValid
    })
  }

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement => ( 
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            valid={formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched} />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
