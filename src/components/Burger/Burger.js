import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import classes from './Burger.css'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredKey => {
            return [...Array(props.ingredients[ingredKey])]
                .map((_, index) => {
                    return (
                        <BurgerIngredient
                            key={ingredKey + index}
                            type={ingredKey}
                        />
                    )
                });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (!transformedIngredients.length) {
        transformedIngredients = <p>Please add ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'}></BurgerIngredient>
        </div>
    );
};

export default burger;