import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.models.js";

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const senderId = req.id;
    const recieverId = req.params.id;
    const { message } = req.body;

    let gotConverSation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!gotConverSation) {
      gotConverSation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      gotConverSation.message.push(newMessage._id);
    }

    await gotConverSation.save();

    // Socket Io

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
});

const getMessage = asyncHandler(async (req, res) => {
  try {
    const recieverId = req.params.id;
    const senderId = req.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("message");
    console.log(conversation.message);

    return res.status(200).json(new ApiResponse(200, "message sent."));
  } catch (error) {
    console.log(error);
  }
});

export { sendMessage, getMessage };
