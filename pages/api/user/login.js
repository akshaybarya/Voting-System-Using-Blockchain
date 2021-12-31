import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Links from "../../../models/Links";
import Testing from "../../../models/Testing";
import nodemailerSend from "../../../lib/nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export default async function handler(req, res) {
  const { body, method } = req;
  req.body = JSON.parse(body);

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const testing = await Testing.findOne({
          aadharNumber: req.body.aadharNumber,
        });
        //console.log("Testing", testing);
        if (!testing) {
          return res
            .status(400)
            .json({ success: false, data: "Invalid Aadhar Number" });
        }
        const userData = await User.findOne({
          aadharNumber: req.body.aadharNumber,
        });
        const userAddress = await Links.findOne({
          aadharNumber: req.body.aadharNumber,
        });
        const token = jwt.sign(
          {
            data: userData._id,
          },
          process.env.USER_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        // const otp = "" + Math.floor(100000 + Math.random() * 900000);
        // console.log("OTP", otp);
        // await nodemailerSend({ to: user.email, otp });
        // bcrypt.hash(otp, saltRounds, (err, hash) => {
        //   // Store hash in your password DB.
        // aadharNumber: req.body.aadharNumber,
        //   if (err) {
        //     throw err;
        //   }
        //   Testing.create({
        //     aadharNumber: user.aadharNumber,
        //     otp: hash,
        //   });
        // });
        // TODO: THIS IS PROBLEM
        const compareOTP = await bcrypt.compare("" + req.body.otp, testing.otp);
        // const hash = await bcrypt.hash(otp, saltRounds);
        //console.log("compareOTP", testing.otp, compareOTP);
        if (!compareOTP) {
          return res.status(400).json({ success: false, data: "Wrong OTP" });
        }

        return res.status(201).json({
          success: true,
          data: {
            aadharNumber: userData.aadharNumber,
            name: userData.name,
            phoneNumber: userData.phoneNumber,
            age: userData.age,
            email: userData.email,
            address: userAddress ? userAddress.address : undefined,
          },
          token,
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
