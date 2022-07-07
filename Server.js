const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDB = require("./Config/connectDB");
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./Routes/user"));
app.use("/api/product", require("./Routes/product"));
app.use("/api/basket", require("./Routes/basket"));
app.use("/api/category", require("./Routes/category"));
app.use("/api/order", require("./Routes/order"));

const port = process.env.PORT;

app.listen(port, (error) => {
  error
    ? console.error("error server")
    : console.log(`Server is running on port ${port}`);
});

console.clear();
