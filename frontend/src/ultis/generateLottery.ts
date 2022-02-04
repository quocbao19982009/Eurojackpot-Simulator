import { v4 as uuidv4 } from "uuid";

const generateLottery = () => {
  let selectedNumber = [];
  while (selectedNumber.length < 5) {
    let r = Math.floor(Math.random() * 50) + 1;
    if (selectedNumber.indexOf(r) === -1) {
      selectedNumber.push(r);
    }
  }

  let selectedStarNumber = [];
  while (selectedStarNumber.length < 2) {
    let r = Math.floor(Math.random() * 10) + 1;
    if (selectedStarNumber.indexOf(r) === -1) {
      selectedStarNumber.push(r);
    }
  }

  return {
    number: selectedNumber.sort((a, b) => a - b),
    starNumber: selectedStarNumber.sort((a, b) => a - b),
    id: uuidv4(),
  };
};

export default generateLottery;
