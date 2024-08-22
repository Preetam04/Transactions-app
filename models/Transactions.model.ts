import mongoose, { Schema } from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default Transaction;
