import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json(`User created successfully!`);
  } catch (error) {
    next(error);
  }
};

// Sign-in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    // User validation check using email
    if (!validUser) return;
    next(errorHandler(404, "User not found"));

    // compare database hashSync password to text password
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    // Password validation check
    if (!validPassword) return;
    next(errorHandler(401, "Invalid Password"));

    // password sundefined so it does not get sent in the response
    validUser.password = undefined;

    // token create
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // token save inside the cookie withname access_token
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(validUser);
  } catch (e) {
    next(error);
  }
};
