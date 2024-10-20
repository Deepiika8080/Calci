import React from 'react'
import "./Button.css";

const Button = ({value, onClick}) => {
  return (
    
    <button className={`button ${value === "=" ? "equals" : ""}  w-[2.rem] m-2`} onClick={onClick}>{value}</button>
  )
}

export default Button;