const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  console.log("Generating Token for User ID:", id); // Debugging
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
exports.signUp = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if a user with the given email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists with email:", email); // Debugging
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({ name, email, phone, password });
    console.log("New User Created:", user); // Debugging

    // Return user details and token
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.error("Error in signUp:", err.message); // Debugging
    res
      .status(500)
      .json({ message: "Error during sign-up. Please try again." });
  }
};

// User Login Controller
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if a user with the given email exists
//     const user = await User.findOne({ email });
//     console.log("User Found:", user); // Debugging

//     // if (user) {
//       // Directly compare the plain text password
//       // if (user.password === password) {
//       //   console.log("Password matched"); // Debugging

// //         // Return user details and token
// //         return res.status(200).json({
// //           _id: user.id,
// //           name: user.name,
// //           email: user.email,
// //           token: generateToken(user.id),
// //         });
// //       } else {
// //         console.log("Invalid password"); // Debugging
// //       }
// //     } else {
// //       console.log("User not found");
// //     }

// //     // Return error for invalid credentials
// //     res.status(401).json({ message: "Invalid email or password" });
// //   } catch (err) {
// //     console.error("Error in login:", err.message); // Debugging
// //     res.status(500).json({ message: "Error during login. Please try again." });
// //   }
// // };

//User Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Check if a user with the given email exists
    const user = await User.findOne({ email });
    console.log("User Found:", user); // Debugging

    if (user) {
      //Directly compare the plain text password
      // if (user.password === password) {
      //   console.log("Password matched"); // Debugging

      // Return user details and token
      return res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      console.log("Invalid password"); // Debugging
    }
  } catch (err) {
    console.error("Error in login:", err.message); // Debugging
    res.status(500).json({ message: "Error during login. Please try again." });
  }
  res.status(401).json({ message: "Invalid email or password" });
};

// };
