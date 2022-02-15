import React, { useEffect } from "react";

import classes from "./NumberBox.module.css";
const numberArray50 = Array.from({ length: 50 }, (_, i) => i + 1);

interface NumberBoxProps {
  lotteryNumber: number[];
  setLotteryNumber: React.Dispatch<React.SetStateAction<number[]>>;
  maxNumber: boolean;
  setMaxNumber: React.Dispatch<React.SetStateAction<boolean>>;
  maxTickets: boolean;
}

const NumberBox = ({
  lotteryNumber,
  setLotteryNumber,
  maxNumber,
  setMaxNumber,
  maxTickets,
}: NumberBoxProps) => {
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
      setLotteryNumber(updatedNumber);
    } else {
      updatedNumber = [...currentNumber, numberInput];
      setLotteryNumber(updatedNumber);
    }
  };

  const numberClasses = (number: number) =>
    `${classes.number} ${
      lotteryNumber.find((n1) => n1 === number) ? classes.active : ""
    } ${maxNumber ? classes.disable : ""}`;

  useEffect(() => {
    if (lotteryNumber.length === 5) {
      setMaxNumber(true);
    } else {
      setMaxNumber(false);
    }

    if (maxTickets) {
      setMaxNumber(true);
    }
  }, [lotteryNumber, maxTickets, setMaxNumber]);

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
    </div>
  );
};

export default NumberBox;
