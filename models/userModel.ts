import mongoose from "mongoose";

interface IUser {
  _id: mongoose.Types.ObjectId;
  userName: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  userName: {
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
