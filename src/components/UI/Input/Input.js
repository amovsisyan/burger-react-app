import React from 'react';
import classes from './Input.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    };

    switch (props.elementType) {
        case('input'):
            inputElement = <input
                onChange={props.change}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
            break;
        case('textarea'):
            inputElement = <textarea
                onChange={props.change}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
            break;
        case('select'):
            inputElement = <select
                onChange={props.change}
                className={inputClasses.join(' ')}
                value={props.value}
            >
                {props.elementConfig.options.map((option) => {
                    return <option
                        key={option.value}
                        value={option.value}>
                            {option.displayValue}
                    </option>
                })}
            </select>
            break;
        default:
            inputElement = <input
                onChange={props.change}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;