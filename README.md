# Eurojackpot Simulator

<img src="https://github.com/quocbao19982009/Eurojackpot-Simulator/blob/master/Eurojackpot%20Simulator.PNG" alt="eurojackpot" />

## General Infomation

This is Eurojackpot Simulator where users can play the lotto without losing real money. The project is a personal project built with MERN Stack from scratch.

The idea behind the project is to give people a realistic view of investing money in gambling. Also to practice web development skills.

Demo: https://eurojackpot-simulator.herokuapp.com/

## Starting the Project

1. Create a `.env` file in the root directory and copy the content from `.env.example`
2. You can use your own mongoDB locally or use MongoDB from Docker. Make sure that your mongoDB is running, if you want to use MongoDB from docker. Start up mongoDB Docker by using `docker compose up`
3. Install dependencies in the root folder: `npm i`
4. Install dependencies in the frontend folder: `cd frontend` `npm i`
5. Use this command for development mode: `npm run dev`

## Technologies

### Frontend:

- ReactJS
- React Router Dom v6
- Material UI
- Redux
- CSS Module

### Backend:

- ExpressJS
- MongoDB
- NodeJS
- Jsonwebtoken
- Bcryptjs

## Future Development Plan

- Improve UX/UI
- Adding admin function
- Adding Unittest
