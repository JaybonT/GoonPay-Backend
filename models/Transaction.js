import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  note: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Transaction", TransactionSchema);
