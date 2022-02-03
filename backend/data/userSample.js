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
            starNumber: [1, 2],
          },
          { number: [46, 50, 28, 31, 12], starNumber: [6, 7] },
        ],
        resultLottery: {
          number: [12, 50, 6, 27, 5],
          starNumber: [6, 10],
        },
        win: 0,
        lotteryCost: -4,
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
