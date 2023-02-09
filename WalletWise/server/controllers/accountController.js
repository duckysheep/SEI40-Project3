const express = require("express");
const router = express.Router();
const Account = require("../models/accountSchema.js");

// Get route for fetching the accounts data that are tagged to user specific
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.find({ userid: id }).exec();
    for (let i = 0; i < account.length; i++) {
      account[i].accountBalance = account[i].accountBalance / 100;
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get route for fetching the account data for edit account page
router.get("/edit-account/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findById(id);
    account.accountBalance = account.accountBalance / 100;

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/new", async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findByIdAndDelete(id);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
