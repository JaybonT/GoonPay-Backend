import express from "express";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/send", auth, async (req, res) => {
  const { recipient, amount, note } = req.body;

  const sender = await User.findById(req.userId);
  const receiver = await User.findOne({ username: recipient });

  if (!receiver) return res.status(400).json({ error: "Recipient not found" });
  if (receiver._id.equals(sender._id))
    return res.status(400).json({ error: "Cannot send to yourself" });
  if (sender.balance < amount)
    return res.status(400).json({ error: "Insufficient funds" });

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  const tx = await Transaction.create({
    from: sender._id,
    to: receiver._id,
    amount,
    note,
  });

  res.json({ message: "Transfer successful", transaction: tx });
});

router.get("/history", auth, async (req, res) => {
  const txs = await Transaction.find({
    $or: [{ from: req.userId }, { to: req.userId }],
  })
    .sort({ timestamp: -1 })
    .populate("from", "username")
    .populate("to", "username");

  res.json(txs);
});

export default router;
