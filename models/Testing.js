import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const TestingSchema = new mongoose.Schema(
  {
    aadharNumber: {
      type: String,
      unique: true,
    },
    otp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Testing ||
  mongoose.model("Testing", TestingSchema);
