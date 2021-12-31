import dbConnect from "../../../lib/dbConnect";
import Link from "../../../models/Links";
import Testing from "../../../models/Testing";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {
        const testing = await Link.collection.drop();
        const testing2 = await Testing.collection.drop();
        return res.status(201).json({
          success: true,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          data: "500! Server Error",
        });
      }
      break;
    default:
      return res
        .status(400)
        .json({ success: false, data: "500! Server Error" });
      break;
  }
}
