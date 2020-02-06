const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

///----------IMPORT ROUTES---------
const authRoute = require("./routes/auth");

////--------CONNECT TO DB--------
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }, () =>
  console.log("Connected to DB")
);

///----MIDDLEWARE
app.use(express.json());

////---------ROUTES MIDDLEWARES-------
app.use("/api/user", authRoute);

app.use((req, rest, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(3000, () =>
  console.log("Server is Up and Running⚡ listening on port: 3000")
);
