const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).send("Email already in the database");
  }

  const user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
