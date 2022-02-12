import bcrypt from "bcryptjs";

const userSample = [
  {
    name: "Bao",
    email: "bao@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    gameHistory: [
      {
        playLottery: [
          {
            number: [1, 2, 3, 4, 5],
            starNumber: [6, 7],
          },
          { number: [8, 9, 10, 11, 12], starNumber: [4, 7] },
        ],
        resultLottery: {
          number: [1, 2, 8, 27, 5],
          starNumber: [6, 10],
        },
        win: 8,
        lotteryCost: 4,
      },
    ],
    transaction: [
      {
        amount: 10,
        paidAt: Date.now(),
      },
      {
        amount: 100,
        paidAt: Date.now(),
      },
    ],
  },
  {
    name: "Cam",
    email: "cam@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Bao Google",
    email: "quocbao19982009@gmail.com",
    password: bcrypt.hashSync("105314631988845025870", 10),
  },
];

export default userSample;
