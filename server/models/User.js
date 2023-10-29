import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    mobile: { type: String, default: null, unique: true },
    email: { type: String, default: null },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, min: 8 },
    birthday: { type: String },
    ordinal: { type: Number },
    bio: { type: String, default: null },
    gender: { type: String, default: null },
    profile_image: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
