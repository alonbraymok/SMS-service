const express = require("express");
const bodyParser = require("body-parser");
const sendSms = require("./twilio");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

const port = 3500;

app.post("/sendSignUpSMS", (req, res) => {
  const number = req.body.phoneNumber;
  const welcomeMessage = `תודה על השתתפותך :)
  באפשרותך להירשם בלינק המצורף כדי להנות משימוש חוזר ללא הוספת מספר כל פעם מחדש ועוד הטבות נוספות
  http://interactive-tv-s3-bucket.s3-website-eu-west-1.amazonaws.com/signup`;

  setTimeout(() => {
    sendSms(number, welcomeMessage);
  }, 60000 * 5);

  res.status(201).send({
    message:
      "Account created successfully, kindly check your phone to activate your account!",
  });
});

app.post("/sendSMS", (req, res) => {
  const number = req.body.phoneNumber;
  const message = req.body.message;
  sendSms(number, message);
  res.status(201).send({
    message: "SMS successfully send",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
