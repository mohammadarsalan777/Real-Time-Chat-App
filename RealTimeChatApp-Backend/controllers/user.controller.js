import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Ensure all fields are provided
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  // Ensure email is valid and not null
  if (typeof email !== "string" || email.trim() === "") {
    throw new ApiError(400, "A valid email is required.");
  }

  // Check for existing user with the same username or email
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(
      409,
      "Conflict: Username or email already exists. Please try another username or email."
    );
  }

  // Hash the password
  const saltRounds = parseInt(process.env.SALT_VALUE, 12);
  const hashPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  const createUser = await User.create({
    email,
    username,
    password: hashPassword,
  });

  // Respond with success
  res.status(201).json(new ApiResponse(201, "User created successfully"));
});
