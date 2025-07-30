const myUser = require("../models/userModel");
// const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const JWT_SECRET = "abc";

const postData = async (req, res) => {
  try {
    const { name, email, mobileNum, password, is_verified } = req.body;
    // const file = req.file;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new myUser({
      name: name,
      email: email,
      mobileNum: mobileNum,
      // file: file.filename,
      password: hashedPassword,
      is_verified: is_verified,
    });
    const addUser = await newUser.save();
    if (addUser) {
      // sendVerifyMail(name, email, addUser._id);
      return res.status(200).json({ message: "User Registration success" });
    }
    res
      .status(201)
      .json({ addUser: addUser, message: "Api Created SuccessFully", status:201});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const sendVerifyMail = async (name, email, user_id) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: "maddison53@ethereal.email",
//         pass: "jn7jnAPss4f63QBp6D",
//       },
//     });

//     const mailOptions = {
//       from: "maddison53@ethereal.email",
//       to: email,
//       subjet: " For Varification",
//       html:
//         "<p>Hii " +
//         name +
//         ' , Please click at the link to <a href="http://localhost:3000/verify?id=' +
//         user_id +
//         ' verify"></a> your mail</p>',
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email has been sent", info.response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const getUser = async (req, res) => {
  try {
    const getUser = await myUser.find();
    res
      .status(200)
      .json({ message: "Data Fetch SuccessFully !", getUser: getUser });
  } catch (error) {}
};

const updateUsers = async (req, res) => {
  try {
    const password = req.body.password
      ? await bcrypt.hash(req.body.password, 10)
      : undefined;

    const updateUser = await myUser.findOneAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        email: req.body.email,
        mobileNum: req.body.mobileNum,
        password: password,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ Message: "User not found" });
    }

    res.status(200).json({
      Message: "User Updated Successfully",
      updateUser: updateUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "An error occurred while updating the user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await myUser.findOneAndDelete({ _id: req.body._id });
    res
      .status(200)
      .json({ message: "User Deleted Successfully!", deleteUser: deleteUser });
  } catch (err) {
    res
      .status(500)
      .json({ Message: "An error occurred while Delete the user", err: err });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await myUser.findOne({ email: email });
    if (!email) {
      return res.status(500).json({ message: "Invalid Email" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(500).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "User Login SuccessFully", user: user, token: token, status:200 });
  } catch (error) {}
};

const verifyMail = async (req, res) => {
  try {
    const updateInfo = myUser.updateOne(
      { _id: req.query._id },
      { $set: { is_verified: 1 } }
    );
    console.log(updateInfo);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  postData,
  getUser,
  updateUsers,
  deleteUser,
  loginUser,
  // verifyMail,
};
