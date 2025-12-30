const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((err) => console.error(err));
