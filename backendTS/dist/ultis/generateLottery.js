"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateLottery = function () {
    var selectedNumber = [];
    while (selectedNumber.length < 5) {
        var r = Math.floor(Math.random() * 50) + 1;
        if (selectedNumber.indexOf(r) === -1) {
            selectedNumber.push(r);
        }
    }
    var selectedStarNumber = [];
    while (selectedStarNumber.length < 2) {
        var r = Math.floor(Math.random() * 10) + 1;
        if (selectedStarNumber.indexOf(r) === -1) {
            selectedStarNumber.push(r);
        }
    }
    return {
        number: selectedNumber.sort(function (a, b) { return a - b; }),
        starNumber: selectedStarNumber.sort(function (a, b) { return a - b; }),
    };
};
exports.default = generateLottery;
