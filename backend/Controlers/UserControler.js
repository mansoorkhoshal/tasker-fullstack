const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// exports.createUser = async (req, res) => {
//   try {
//     let { fullName, email, password, contact, image } = req.body;
//     const userResult = await Users.create({
//       fullName,
//       email,
//       password,
//       contact,
//       image,
//     });
//     res.status(201).json(userResult);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.GetUsersById = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.DeleteUsers = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);

    if (result) {
      res.status(200).json("User deleted successfully");
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.UpdateUsers = async (req, res) => {
  try {
    const { fullName, email, password, contact, image } = req.body;

    const result = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email, password, contact, image },
      { new: true },
    );

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.Signup = async (req, res) => {
  try {
    let { fullName, email, password, contact } = req.body;
    // console.log(req.body);
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return res.status(400).json(`User is already exist with ${email}`);
    }
    const hashPassword = await bcrypt.hash(password, 10);

    // const imagePath =
    const userResult = await Users.create({
      fullName,
      email,
      password: hashPassword,
      contact,
      image:  req.path ? req.file.path : null
    });
    // console.log(userResult);
    res.status(201).json(userResult);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// exports.Login = async (req, res) => {
//   const { email, password } = req.body;
//   const ExistingUser = await Users.findOne({ email });
//   if (ExistingUser) {
//     if (await bcrypt.compare(password, ExistingUser.password)) {
//       let key = process.env.KEY;
//       let expiry = Number(process.env.EXPIRES);
//       let payLoad = {
//         Name: ExistingUser.fullName,
//         Email: ExistingUser.email,
//       };
//       let token = jwt.sign(payLoad, key, {
//         expiresIn: expiry,
//       });

//       res.cookie("jwt", token, {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 60 *1000,
//       });
//       return res.status(200).json({
//         User: ExistingUser,
//         Token: token,
//       });
//     } else {
//       return res.status(400).json(`Please check your password`);
//     }
//   } else {
//     return res.status(404).json(`User not exist against ${email}`);
//   }
// };

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: `User not found with ${email}` });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        fullName: existingUser.fullName, // ✅ FIXED
        email: existingUser.email,
      },
      process.env.KEY,
      { expiresIn: process.env.EXPIRES }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      user: existingUser,
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
