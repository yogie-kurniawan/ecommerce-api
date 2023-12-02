require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// MIDDLEWARE VAR
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// ROUTES VAR
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

// CONFIG
// Enable CORS for all routes
app.use(cors());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// Template Engine
app.set("views", "views");
app.set("view engine", "ejs");

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);

// MIDDELWARE
app.use(errorHandlerMiddleware);
app.use(notFound);

// PORT
const port = process.env.PORT || 3000;

// CONNECTION
const start = async () => {
  try {
    // connect DB
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
