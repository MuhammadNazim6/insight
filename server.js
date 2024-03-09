const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const nocache = require("nocache");
const path = require("path");
const userRoute = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const app = express();
dotenv.config({ path: ".env" });
mongoose.connect(process.env.MONGO_DB + "insight");
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//static files
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/images", express.static(path.resolve(__dirname, "assets/images")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/script", express.static(path.resolve(__dirname, "assets/script")));
app.use("/fonts", express.static(path.resolve(__dirname, "assets/fonts")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//routes
app.use("/", userRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);