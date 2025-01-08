const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  amount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Users", UserSchema);
