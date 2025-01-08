const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/expenses", require("./api/expenses/addExpenses"));
app.use("/api/expenses", require("./api/expenses/getExpenses"));
app.use("/api/expenses", require("./api/expenses/splitExpenses"));

app.use("/api/users", require("./api/users/addUsers"));
app.use("/api/users", require("./api/users/getUsers"));

app.use("/api/auth", require("./api/auth/login"));
app.listen(5000, () => console.log("Server running on port 5000"));
