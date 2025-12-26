import mongoose from "mongoose";

interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);
export { userModel, type IUser };
