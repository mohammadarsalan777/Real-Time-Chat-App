import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  return res.status(200).json({ message: "success" });
});
