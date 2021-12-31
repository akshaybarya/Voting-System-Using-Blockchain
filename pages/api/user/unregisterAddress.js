import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Testing from "../../../models/Testing";
import nodemailerSend from "../../../lib/nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Links from "../../../models/Links";

const saltRounds = 10;

export default async function handler(req, res) {
  const { body, method } = req;
  req.body = JSON.parse(body);

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const testing = await Testing.deleteOne({
          aadharNumber: req.body.aadharNumber,
        });

        return res.status(201).json({
          success: true,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ success: false, data: "500! Server Error" });
      }
      break;
    default:
      return res
        .status(400)
        .json({ success: false, data: "500! Server Error" });
      break;
  }
}
