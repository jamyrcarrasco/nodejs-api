const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
var bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({
    email: req.body.email.toLowerCase()
  });
  if (emailExist) {
    return res.status(400).send("Email already in the database");
  }

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email.toLowerCase(),
    password: hashedPassword
  });
  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  ///Validate object on req
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  ///Check if Email Exist
  const emailExist = await User.findOne({
    email: req.body.email.toLowerCase()
  });

  if (!emailExist) return res.status(400).send("Invalid credentials user");

  ///Check if password is correct
  const validPass = await bcrypt.compareSync(
    req.body.password,
    emailExist.password
  );
  if (!validPass) return res.status(400).send("Invalid credentials password");
  res.status(200).status("You're logged in!");
});
module.exports = router;
