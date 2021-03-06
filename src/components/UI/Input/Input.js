import React from "react";

import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.inputElement];

  if (props.valid === false && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }


  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(element =>
            <option key={element.value} value={element.value}>
              {element.displayValue}
            </option>
          )}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  let validationError = null;
  if (!props.valid && props.touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
