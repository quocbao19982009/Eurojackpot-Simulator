"use strict";
/* const numberSelectedbyUser = [1, 2, 3, 18, 50];
const numberSelectedResult = [1, 3, 20, 23, 25];
const starNumberSelectedbyUser = [1, 2];
const starNumberSelectedResult = [2, 3];

const inputLottery = {
  numberSelectedbyUser,
  starNumberSelectedbyUser,
};

const resultLottery = {
  numberSelectedResult,
  starNumberSelectedResult,
};
playerLottery: {
numberSelectedbyUser,
numberSelectedResult
}
*/
Object.defineProperty(exports, "__esModule", { value: true });
var compareLotteryTicket = function (arr1, arr2) {
    return arr1.filter(function (item) { return arr2.includes(item); });
};
var calculatedWin = function (playerLottery, resultLottery) {
    var numberSelectedbyUser = playerLottery.number, starNumberSelectedbyUser = playerLottery.starNumber;
    var numberSelectedResult = resultLottery.number, starNumberSelectedResult = resultLottery.starNumber;
    var winNumber = compareLotteryTicket(numberSelectedbyUser, numberSelectedResult).length;
    var winStartNumber = compareLotteryTicket(starNumberSelectedbyUser, starNumberSelectedResult).length;
    if (winNumber === 2 && winStartNumber === 1) {
        return 8;
    }
    if (winNumber === 1 && winStartNumber === 2) {
        return 10;
    }
    if (winNumber === 3 && winStartNumber === 0) {
        return 15;
    }
    if (winNumber === 3 && winStartNumber === 1) {
        return 17;
    }
    if (winNumber === 2 && winStartNumber === 2) {
        return 21;
    }
    if (winNumber === 4 && winStartNumber === 0) {
        return 103;
    }
    if (winNumber === 3 && winStartNumber === 2) {
        return 56;
    }
    if (winNumber === 4 && winStartNumber === 1) {
        return 230;
    }
    if (winNumber === 4 && winStartNumber === 2) {
        return 4072;
    }
    if (winNumber === 5 && winStartNumber === 0) {
        return 96134;
    }
    if (winNumber === 5 && winStartNumber === 1) {
        return 470639;
    }
    if (winNumber === 5 && winStartNumber === 2) {
        return 34573468;
    }
    else {
        return 0;
    }
};
exports.default = calculatedWin;
