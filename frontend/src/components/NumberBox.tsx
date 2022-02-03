import React, { useState, useEffect } from "react";
import lotteryModel from "../models/lotteryModels";
import classes from "./NumberBox.module.css";
const numberArray50 = Array.from({ length: 50 }, (_, i) => i + 1);
const numberArray10 = Array.from({ length: 10 }, (_, i) => i + 1);

const NumberBox = () => {
  const [lotteryNumber, setLotteryNumber] = useState<number[]>([]);
  const [maxNumber, setMaxNumber] = useState<boolean>(false);

  const [starNumber, setStarNumber] = useState<number[]>([]);
  const [maxStarNumber, setMaxStarNumber] = useState<boolean>(false);

  const selectNumberHandler = (numberInput: number) => {
    const currentNumber = [...lotteryNumber];
    const exitedNumberIndex = currentNumber.findIndex(
      (number) => number === numberInput
    );
    const exitedNumber = currentNumber[exitedNumberIndex];
    let updatedNumber: number[];
    if (exitedNumber) {
      currentNumber.splice(exitedNumberIndex, 1);
      updatedNumber = [...currentNumber];
      console.log("updatedNumber", updatedNumber);
      setLotteryNumber(updatedNumber);
    } else {
      updatedNumber = [...currentNumber, numberInput];
      setLotteryNumber(updatedNumber);
    }
  };

  const selectStarNumberHandler = (numberInput: number) => {
    const currentNumber = [...starNumber];
    const exitedNumberIndex = currentNumber.findIndex(
      (number) => number === numberInput
    );
    const exitedNumber = currentNumber[exitedNumberIndex];
    let updatedNumber: number[];
    if (exitedNumber) {
      currentNumber.splice(exitedNumberIndex, 1);
      updatedNumber = [...currentNumber];
      setStarNumber(updatedNumber);
    } else {
      updatedNumber = [...currentNumber, numberInput];
      setStarNumber(updatedNumber);
    }
  };

  const numberClasses = (number: number) =>
    `${classes.number} ${
      lotteryNumber.find((n1) => n1 === number) ? classes.active : ""
    } ${maxNumber ? classes.disable : ""}`;

  useEffect(() => {
    if (lotteryNumber.length >= 5) {
      setMaxNumber(true);
    } else {
      setMaxNumber(false);
    }
    if (starNumber.length >= 2) {
      setMaxStarNumber(true);
    } else {
      setMaxStarNumber(false);
    }
  }, [starNumber, lotteryNumber]);

  console.log(lotteryNumber, maxNumber, starNumber, maxStarNumber);

  return (
    <div className={classes.numberBox}>
      <div className={classes.label}>
        <span>Select numbers</span>
      </div>
      <div className={classes.numberGird}>
        {numberArray50.map((number) => (
          <div
            key={`number_${number}`}
            onClick={() => selectNumberHandler(number)}
            className={numberClasses(number)}
          >
            {number}
          </div>
        ))}
      </div>

      <div className={classes.label}>
        <span>Select Star Numbers</span>
      </div>
      <div className={classes.numberGird}>
        {numberArray10.map((number) => (
          <div
            onClick={() => selectStarNumberHandler(number)}
            key={`starNumber_${number}`}
            className={classes.number}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberBox;
