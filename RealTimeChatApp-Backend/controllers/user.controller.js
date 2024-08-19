import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  if (
    fullName === "" ||
    username === "" ||
    password === "" ||
    confirmPassword === "" ||
    gender === ""
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  if (password !== confirmPassword) {
    throw new ApiError(
      400,
      "Password and Confirm Password should be the same."
    );
  }

  const isUserExist = await User.findOne({ username });
  if (isUserExist) {
    throw new ApiError(
      409,
      "Username already exists. Try registering with another username."
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // Profile Photo
  const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  await User.create({
    fullName,
    username,
    password: hashPassword,
    profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
    gender,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    throw new ApiError(400, "User not found or Does not exist>");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(404, "Incorrect password");
  }

  // Generate token
  const tokenData = {
    userId: existingUser._id,
  };

  const token = await jwt.sign(tokenData, process.env.JWT_SECRETE_KEY, {
    expiresIn: "1d",
  });

  const data = {
    _id: existingUser._id,
    username: existingUser.username,
    fullName: existingUser.fullName,
    profilePhoto: existingUser.profilePhoto,
  };
  return res
    .status(200)
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    })
    .json(new ApiResponse(200, data, "User logged in successfully"));
});

const logout = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json(new ApiResponse(200, "User logged out successfully"));
  } catch (error) {
    throw new ApiError(500, "Internal Server error", error);
  }
});

const getOtherUser = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
});
export { register, login, logout, getOtherUser };
