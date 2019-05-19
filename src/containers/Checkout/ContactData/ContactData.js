import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
            this.setState({
            loading:true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, // !!! not safe as price is managed on the user-side
            customer: {
                name: 'Mel',
                address: {
                    street: 'Street',
                    zip: '04403'
                },
                mail: 'aa@aa.com'
            }
        };
       axios.post('/orders.json', order).then(res => {
           this.setState({
               loading:false
           });
           this.props.history.push('/')
       }).catch(err => {
        this.setState({
            loading:false
            })
        });
  }


  render() {
      let form = (<form>
        <input type="text" name="name" placeholder="Your Name" className={classes.input} />
        <input type="email" name="email" placeholder="Your Email" className={classes.input} />
        <input type="text" name="street" placeholder="Street" className={classes.input} />
        <input type="text" name="postal" placeholder="Postal Code" className={classes.input} />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>);
    if(this.state.loading){
        form = (<Spinner />);
    }
    return <div className={classes.ContactData}>
        <h4>Enter your Contact data</h4>
        {form}
        
    </div>;
  }
}

export default ContactData;
