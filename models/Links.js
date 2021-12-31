import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const LinkSchema = new mongoose.Schema({
  aadharNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.Link || mongoose.model("Link", LinkSchema);
