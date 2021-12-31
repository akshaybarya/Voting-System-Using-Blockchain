// import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  const { body, method } = req;
  req.body = JSON.parse(body);

  // await dbConnect();

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
        // console.log(process.env);
        // console.log(JSON.parse(req.body));
        console.log(
          req.body.username === process.env.ADMIN_USERNAME &&
            req.body.password === process.env.ADMIN_PASSWORD
        );
        if (
          req.body.username === process.env.ADMIN_USERNAME &&
          req.body.password === process.env.ADMIN_PASSWORD
        ) {
          res.status(201).json({ success: true });
        } else {
          res
            .status(400)
            .json({ success: false, data: "Invalid username or password" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, data: "500! Server Error" });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "500! Server Error" });
      break;
  }
}
