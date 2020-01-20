const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
    min: 3
  },
  lastName: {
    type: String,
    required: true,
    max: 50,
    min: 3
  },
  email: {
    type: String,
    required: true,
    max: 100,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
