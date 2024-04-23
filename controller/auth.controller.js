const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);

  const user = new User({ ...req.body, token, password: hashedPassword });

  user
    .save()
    .then((response) => res.status(201).json(response))
    .catch((err) => console.log(err));
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "no such user" });
  } else {
    const isUser = bcrypt.compareSync(password, user.password);
    if (isUser) {
      const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
      user.token = token;
      user
        .save()
        .then(() =>
          res.status(200).json({ message: "user is loged in", token })
        )
        .catch((err) => console.log(err));
    } else {
      res.status(401).json({ message: "wrong credintails" });
    }
  }
};
