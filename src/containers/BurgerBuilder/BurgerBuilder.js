import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        puchasable: 0,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(res => {
            this.setState({ingredients: res.data});
        }).catch(error => {
            this.setState({error:true});
        });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKeys) => {
            return ingredients[igKeys];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({puchasable: sum > 0});
    };
   
    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(newIngredients);
    };

    removeIngredientHandler = (type) => {
        let newCount = this.state.ingredients[type];
        if(newCount > 0){
            newCount = newCount - 1;
            const newIngredients = {
                ...this.state.ingredients
            };
            newIngredients[type] = newCount;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({
                ingredients: newIngredients,
                totalPrice: newPrice
            });
            this.updatePurchaseState(newIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing:false
        });
    }

    purchaseContinueHandler = () => {
        const query = [];
        for(let i in this.state.ingredients) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        query.push('price=' + this.state.totalPrice);
        const queryString = query.join('&')
        this.props.history.push({
            pathname:'/order',
            search: queryString
        });

    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] === 0 ? true : false;
        }

        let burger = this.state.error ? <p>Ingregient error</p> : <Spinner />;
        let orderSummary = null;

        if(this.state.ingredients){
            burger = (<Aux><Burger ingredients={this.state.ingredients} />
            <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.puchasable}
            ordered={this.purchaseHandler} /></Aux>);
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} 
            total={this.state.totalPrice} />;
        }

        if(this.state.loading){
        orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);