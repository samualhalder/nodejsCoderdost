const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(v);
      },
      message: (props) => `${props.value} is not a valid eamil address!`,
    },
  },
  password: { type: String, required: true, minLength: 6 },
  token: { type: String },
});

exports.User = mongoose.model("User", userSchema);
