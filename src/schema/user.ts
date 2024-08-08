import mongoose from "mongoose";
import { UserType } from "../types/user";

const UserSchema = new mongoose.Schema<UserType>({
  id: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const UserModel = mongoose.model<UserType>("User", UserSchema);

export { UserModel, UserSchema };
