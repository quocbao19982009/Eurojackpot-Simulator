import React, { useEffect } from "react";

import classes from "./StarNumberbox.module.css";

const numberArray10 = Array.from({ length: 10 }, (_, i) => i + 1);

interface StarNumberBoxProps {
  starNumber: number[];
  setStarNumber: React.Dispatch<React.SetStateAction<number[]>>;
  maxStarNumber: boolean;
  setMaxStarNumber: React.Dispatch<React.SetStateAction<boolean>>;
  maxTickets: boolean;
}

const StarNumberBox = ({
  starNumber,
  setStarNumber,
  maxStarNumber,
  setMaxStarNumber,
  maxTickets,
}: StarNumberBoxProps) => {
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
      starNumber.find((n1) => n1 === number) ? classes.active : ""
    } ${maxStarNumber ? classes.disable : ""}`;

  useEffect(() => {
    if (starNumber.length === 2) {
      setMaxStarNumber(true);
    } else {
      setMaxStarNumber(false);
    }
    if (maxTickets) {
      setMaxStarNumber(true);
    }
  }, [starNumber, maxTickets, setMaxStarNumber]);

  return (
    <div className={classes.numberBox}>
      <div className={classes.label}>
        <span>Select Star Numbers</span>
      </div>
      <div className={classes.numberGird}>
        {numberArray10.map((number) => (
          <div
            onClick={() => selectStarNumberHandler(number)}
            key={`starNumber_${number}`}
            className={numberClasses(number)}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarNumberBox;
