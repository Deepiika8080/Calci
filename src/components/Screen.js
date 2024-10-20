import { Textfit } from "react-textfit";
import React from 'react'

const Screen = ({value}) => {
  console.log(value);
  return (
    <Textfit className="w-[100%] h-[100px] flex justify-end items-center pr-4 text-white font-bold box-border" mode="single" max={70} >
        {value}
    </Textfit>
  )
}

export default Screen;