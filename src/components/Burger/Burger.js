import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, id) => {
            return <BurgerIngredient type={igKey} key={igKey + id} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []); //Without reduce the returned Array would be populated with the number of ingredients even if there no ingredients
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>;
    }
    return(
        <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" key="bread-top" />
            {transformedIngredients}
        <BurgerIngredient type="bread-bottom" key="bread-bottom" />
        </div>
    );  
};

export default burger;