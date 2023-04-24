const nodemailer = require("nodemailer");
const express = require("express");

const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/sendmail", async (req, res) => {
  const sendmail = req.body.mail;
  const subject = req.body.subject;
  const text = req.body.text;
  
  try{
    let transporter = nodemailer.createTransport({
        host: "gmail",
        port: 587,
        host: "smtp.gmail.com",
        auth: {
          user: "maharajakumar3000@gmail.com", // generated ethereal user
          pass: "ngdohqnxxuuicmeu", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: "maharajakumar3000@gmail.com", // sender address
        to: sendmail, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
      });
    res.send("success")
  } catch(error) {
    console.log(error)
    res.send("error")
  }
});

app.listen(3001, () => console.log("server running in port 3001"));
