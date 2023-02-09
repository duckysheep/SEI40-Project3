const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    accountName: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    type: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: "0" },
    description: { type: String, trim: true },
    date: { type: Date, required: true, default: new Date() },
    userid: { type: String, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
