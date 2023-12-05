import mongoose from "mongoose";

const SpotUserSchema = new mongoose.Schema({
  spotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spot",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendStatus: {
    type: String,
    required: true,
    enum: ["pending", "present", "absent"],
    default: "pending",
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

SpotUserSchema.index({ spotId: 1, userId: 1 }, { unique: true });

const SpotUser = mongoose.model("SpotUser", SpotUserSchema, "SpotUser");
export default SpotUser;
