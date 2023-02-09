const mongoose = require("mongoose");

const incomeSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    account: {
      type: String,
      required: true,
      trim: true,
    },
    category: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    amount: {
      type: Number,
      required: true,
      min: "0",
    },
    description: { type: String, trim: true },
    date: { type: Date, required: true, default: new Date() },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
