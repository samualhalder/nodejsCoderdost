const { User } = require("../models/user.model");
const bycript = require("bcryptjs");



exports.getAllUsers = (req, res) => {
  User.find()
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};

exports.getUserByID = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};

exports.replaceUserByID = (req, res) => {
  const id = req.params.id;
  User.findOneAndReplace({ _id: id }, req.body, { new: true })
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};
exports.updateUserByID = (req, res) => {
  const id = req.params.id;
  User.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};
exports.deleteUserById = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((response) => res.status(200).json(response))
    .catch((err) => console.log(err));
};
