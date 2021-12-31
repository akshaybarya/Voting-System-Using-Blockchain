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
        /*
        const testing = await Testing.findOne({
          aadharNumber: req.body.aadharNumber,
        });
        //console.log("Testing", req.body);
        //console.log("Testing", testing);
        if (!testing) {
          return res.status(400).json({ success: false, data: "Retry" });
        }
        /*        // const userData = await User.findOne({
        //   aadharNumber: req.body.aadharNumber,
        // });
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
        console.log("compareOTP", testing.otp, compareOTP);
        if (!compareOTP) {
          return res.status(400).json({ success: false, data: "Wrong OTP" });
        }
*/
        const link = await Links.create({
          aadharNumber: req.body.aadharNumber,
          address: req.body.address,
        });

        return res.status(201).json({
          success: true,
          data: {
            aadharNumber: link.aadharNumber,
            address: link.address,
          },
        });
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ success: false, data: "500! Server Error" });
      }
      break;
    case "DELETE":
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
