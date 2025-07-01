const express = require('express');
const {connectToDatabase} = require('./connection');
const {logRequestResponse} = require('./middlewares');

const userRouter = require("./routes/user");
const app = express();

//Connection
connectToDatabase('mongodb://127.0.0.1:27017/userdb')

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(logRequestResponse('log.txt'));

//Routes
app.use("/user", userRouter);

app.listen(3000, () => console.log("Server is running on port 3000"));