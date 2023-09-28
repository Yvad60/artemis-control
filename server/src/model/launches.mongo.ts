import mongoose from "mongoose";

const launchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: false,
  },
  rocket: String,
  launchDate: Date,
  destination: String,
});
