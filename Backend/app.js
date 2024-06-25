const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
module.exports = { io };

// Import routes
const usersRouter = require("./Routes/user");
app.use('/api/users', usersRouter);

const examsRouter = require("./routes/exam");
app.use('/api/exams', examsRouter);

const loggedInUsersRouter = require("./Routes/loggedInUsers");
app.use('/api/logged/in', loggedInUsersRouter);

// const traineeRouter = require('./routes/trainee');
// app.use('/api/trainees', traineeRouter);

// Add the reschedule exam route
// const rescheduleRouter = require('./routes/reschedule');
// app.use('/api/exams', rescheduleRouter);

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
  return res.status(404).send("Page not found");
});

app.listen(process.env.PORT, () => console.log(`server started and listening on port ${process.env.PORT}`));









const router = express.Router();
const Exam = require("./Models/examModel"); 




router.post("/book", async (req, res) => {
  try {

    
    const { traineeId, examId } = req.body;

  
    


    
    const booking = new Booking({
      traineeId,
      examId,
    
    });

   
    await booking.save();

 
    res.status(201).json({ message: "Exam booking successful" });
  } catch (error) {
  
    res.status(500).json({ error: error.message });
  }
});


router.get("/bookings/:traineeId", async (req, res) => {
  try {
 
    const { traineeId } = req.params;

   
    const bookings = await Booking.find({ traineeId });

   
    res.status(200).json({ bookings });
  } catch (error) {
 
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;