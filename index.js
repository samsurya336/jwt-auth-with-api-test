const express = require("express");
const authRoutes = require("./app/routes/authRoutes");
const postRoutes = require("./app/routes/postRoutes");
require("dotenv").config();
// stopped in auth schema
const app = express();
// app.use(helmet)
app.use(express.json());

app.use("/api/v0.1/auth", authRoutes);
app.use("/api/v0.1/post", postRoutes);

app.listen(process.env.PORT, () => {
  console.log("App Listening on PORT : ", process.env.PORT);
});

exports.app = app;
