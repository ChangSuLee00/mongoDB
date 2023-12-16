import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  },
  addressDetail: {
    type: String,
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

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ address: 1 });

UserSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  if (!this.updatedAt) {
    this.updatedAt = new Date();
  }
  next();
});

const User = mongoose.model("User", UserSchema, "User");
export default User;
