require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const signupController = require("./controllers/signupController.js");
const loginController = require("./controllers/loginController.js");
const transactionController = require("./controllers/transactionController.js");
const accountController = require("./controllers/accountController.js");

const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log("Mongo_URI", MONGO_URI);
mongoose.set("debug", true);
mongoose.set("runValidators", true);
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("../client/dist"));
app.use("/api/signup", signupController);
app.use("/api/login", loginController);
app.use("/api/transaction", transactionController);
app.use("/api/account", accountController);

app.get("/api", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.get("*", (req, res) =>
  res.sendFile(path.resolve("../client/dist", "index.html"))
);

mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
