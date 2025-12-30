const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
  override: true
});

console.log("CWD:", process.cwd());
console.log("Mongo URI:", process.env.MONGODB_URI);

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
