import mongoose from "mongoose";
import { Schema } from "mongoose";

const AccountSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

const Account =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);

export default Account;
