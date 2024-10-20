import React from "react";
import Wrapper from "./components/Wrraper";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";
import Screen from "./components/Screen";
import { useState } from "react";

const btnValues = [
  ["C", "+/-", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  [0, ".", "="],
]

const LocaleString = (num) => {
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");// num = 1234567 => 123 456 7
}

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

export default function App() {

  const [Calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0
  });

  const numhandler = (e) => {
    e.preventDefault();
    
    const value = e.target.innerHTML;
    
    if (Calc.num.toString().length < 16) {
      setCalc({
        ...Calc, num: Calc.num === 0 && value === 0 ? 0 : Calc.num % 1 === 0 ? Number(Calc.num + value) : Calc.num + value,
        res: !Calc.sign ? 0 : Calc.res
      })
    }
    console.log("res",Calc.res);
    console.log("num",Calc.num);
  }


  const resetHandler = () => {
    setCalc({
      ...Calc, num: 0, res: 0, sign: ""
    })
  }
  const invertsignhandler = () => {
    setCalc({
      ...Calc,
      num: Calc.num ? Calc.num * -1 : 0,
      res: Calc.res ? Calc.res * -1 : 0,
      sign: ""
    });
  }

  const equalshandler = () => {
    if (Calc.sign && Calc.num) {
      const math = (a, b, sign) => {
        console.log("a",a);
        console.log("b",b);
        if (sign === "+") {
          return a + b;
        }
        else if (sign === "-") {
          return a - b;
        }
        else if (sign === "*") {
          return a * b;
        }
        else {
          return a / b;
        }
      }

      setCalc({
        ...Calc,
        res: Calc.num === "0" && Calc.sign === "/" ? "can divide by zero" : math(Number(Calc.res), Number(Calc.num), Calc.sign),
        sign: "",
        num: 0,
      })
    }


  }


  const modulohandler = () => {

    let num = Calc.num ? parseFloat(Calc.num) : 0;
    let res = Calc.res ? parseFloat(Calc.res) : 0;

    setCalc({
      ...Calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: ""
    })
  }

  const dothandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;
    setCalc({

      ...Calc,
      num: Calc.num.toString().includes(".") ? Calc.num : Calc.num + value
    })
  }

  const signhandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;
    console.log(value);
    setCalc({
      ...Calc,
      sign: value,
      res: !Calc.res && Calc.num ? Calc.num : Calc.res,
      num: 0
    });
    console.log("res",Calc.res);
    console.log("sign",Calc.sign);
  }

  return (
    <>
      <Wrapper>
        <Screen value={Calc.num ? Calc.num : Calc.res} />
        <ButtonBox>
          {
            btnValues.flat().map((btn, i) => {
              return <Button value={btn} key={i} onClick={(e) => {
                btn === "C" ? resetHandler() : btn === "+/-" ? invertsignhandler() : btn === "%" ? modulohandler() : btn === "." ? dothandler(e) :
                  btn === "*" || btn === "-" || btn === "+" || btn === "/" ? signhandler(e) : btn === "=" ? equalshandler() :  numhandler(e)
              }} />
            })
          }
        </ButtonBox>
      </Wrapper>
    </>
  )
}