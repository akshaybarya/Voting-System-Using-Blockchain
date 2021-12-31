import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import Testing from "../../../models/Testing";
import nodemailerSend from "../../../lib/nodemailer";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default async function handler(req, res) {
  const { body, method } = req;
  req.body = JSON.parse(body);

  await dbConnect();

  switch (method) {
    // case 'GET':
    //   try {
    //     const pets = await Pet.find({}) /* find all the data in our database */
    //     res.status(200).json({ success: true, data: pets })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break
    case "POST":
      try {
        const user = await User.findOne({
          aadharNumber: req.body.aadharNumber,
        });
        // .then(async (user) => {
        //   if (!user) {
        //     return res
        //       .status(400)
        //       .json({ success: false, data: "Invalid Aadhar Number" });
        //   }
        //   console.log(user);
        //   const otp = Math.floor(100000 + Math.random() * 900000);
        //   console.log("OTP", otp);
        //   await nodemailerSend({ to: user.email, otp });

        //   return res
        //     .status(400)
        //     .json({ success: false, data: "500! Server Error" });
        // })
        // .catch((err) => {
        //   console.error(err);
        //   return res
        //     .status(400)
        //     .json({ success: false, data: "500! Server Error" });
        // });
        //console.log("User", user);
        if (!user) {
          return res
            .status(400)
            .json({ success: false, data: "Invalid Aadhar Number" });
        }
        const otp = "" + Math.floor(100000 + Math.random() * 900000);
        //console.log("OTP", otp);
        await nodemailerSend({ to: user.email, otp });
        // bcrypt.hash(otp, saltRounds, (err, hash) => {
        //   // Store hash in your password DB.
        //   if (err) {
        //     throw err;
        //   }
        //   Testing.create({
        //     aadharNumber: user.aadharNumber,
        //     otp: hash,
        //   });
        // });

        const hash = await bcrypt.hash(otp, saltRounds);
        // const hash = otp;
        //console.log(hash);
        if (!hash) {
          throw new Error("Hashing Error");
        }
        await Testing.updateOne(
          {
            aadharNumber: user.aadharNumber,
          },
          {
            otp: hash,
          },
          { upsert: true, setDefaultsOnInsert: true }
        );

        return res.status(201).json({ success: true });
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
