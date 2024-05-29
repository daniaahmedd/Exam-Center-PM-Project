const express = require("express");
const cookieParser=require('cookie-parser') 
const app = express();
const mongoose = require("mongoose");
require('dotenv').config(); 
const cors = require("cors");
app.use(express.json()) 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()) 
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

const http = require('http');
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors:{
    origin:'*'
  }
}).listen(4000);
module.exports= {io};

// const authRouter = require("./Routes/auth");
// app.use("/api/auth", authRouter);

const usersRouter = require("./Routes/user");
app.use('/api/users', usersRouter);

const examsRouter = require("./Routes/exam");
app.use('/api/exams', examsRouter);

const authenticationMiddleware = require("./Middleware/authenticationMiddleware");
app.use(authenticationMiddleware);


const db_url = 'mongodb://127.0.0.1:27017/Exam_center';

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log(e));

app.use(function (req, res, next) {
  return res.status(404).send(e.message);
});

app.listen(process.env.PORT, () => console.log(`server started and listening on port`));  

