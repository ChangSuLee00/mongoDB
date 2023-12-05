import mongoose from "mongoose";

const SpotSchema = new mongoose.Schema({
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  spotName: {
    type: String,
    required: true,
  },
  spotDate: {
    type: [Date],
    required: true,
  },
  discription: {
    type: String,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  },
  locationDetail: {
    type: String,
  },
  locationGeo: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
});

SpotSchema.index({ spotName: 1 });
SpotSchema.index({ location: 1 });
SpotSchema.index({ locationGeo: "2dsphere" });

const Spot = mongoose.model("Spot", SpotSchema, "Spot");
export default Spot;
