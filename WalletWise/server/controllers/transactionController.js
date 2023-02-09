const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionSchema.js");
const Account = require("../models/accountSchema.js");

router.get("/", async (req, res) => {
  try {
    const transaction = await Transaction.find().exec();
    for (let i = 0; i < transaction.length; i++) {
      transaction[i].amount = transaction[i].amount / 100;
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.find({ userid: id }).exec();
    for (let i = 0; i < transaction.length; i++) {
      transaction[i].amount = transaction[i].amount / 100;
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/income/total/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const income = Transaction.aggregate(
      [
        { $match: { $and: [{ userid: id }, { type: "income" }] } },
        {
          $group: {
            _id: "$category",
            total: {
              $sum: "$amount",
            },
          },
        },
      ],
      function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/expense/total/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const expense = Transaction.aggregate(
      [
        { $match: { $and: [{ userid: id }, { type: "expense" }] } },
        {
          $group: {
            _id: "$category",
            total: {
              $sum: "$amount",
            },
          },
        },
      ],
      function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    console.log(transaction);
    res.status(201).json(transaction);

    let updateAmount;
    if (req.body.type === "expense") {
      updateAmount = req.body.amount * -1;
    } else {
      updateAmount = req.body.amount;
    }

    const updatedAccount = await Account.findOneAndUpdate(
      { userid: req.body.userid, accountName: req.body.accountName },
      {
        $inc: {
          accountBalance: updateAmount,
        },
      },
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(400), json({ error: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    transaction.amount = transaction.amount / 100;
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const delTransaction = await Transaction.findByIdAndDelete(id);

    let updateAmount;
    if (delTransaction.type === "income") {
      updateAmount = delTransaction.amount * -1;
    } else {
      updateAmount = delTransaction.amount;
    }

    const updatedAccount = await Account.findOneAndUpdate(
      {
        userid: delTransaction.userid,
        accountName: delTransaction.accountName,
      },
      {
        $inc: {
          accountBalance: updateAmount,
        },
      },
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(400), json({ error: "Account not found" });
    }

    res.status(200).json(delTransaction);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// //TODO a route that filters the data by income/expenses and by period (MMM/YYYY)
// router.get("/total", async (req, res) => {
//   try {
//     const income = Transaction.aggregate(
//       [
//         { $match: { $and: [{ userid: id }, { type: "income" }] } },
//         {
//           $group: {
//             _id: "$category",
//             total: {
//               $sum: "$amount",
//             },
//           },
//         },
//       ],
//       function (err, result) {
//         if (err) {
//           res.json(err);
//         } else {
//           res.status(200).json(result);
//         }
//       }
//     );
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });
// //

//get all income for userid and accountname
router.get("/account/income/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const income = Transaction.aggregate(
      [
        { $match: { $and: [{ userid: id }, { type: "income" }] } },
        {
          $group: {
            _id: "$accountName",
            income: {
              $sum: "$amount",
            },
          },
        },
      ],
      function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

//get all expenses for userid and accountname
router.get("/account/expense/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const income = Transaction.aggregate(
      [
        { $match: { $and: [{ userid: id }, { type: "expense" }] } },
        {
          $group: {
            _id: "$accountName",
            expense: {
              $sum: "$amount",
            },
          },
        },
      ],
      function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
