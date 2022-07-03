const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const carRouter = require("./routes/cars");
const sellRouter = require("./routes/sells");
const complaintRouter = require("./routes/complaints");
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/autoplac-db", { useNewUrlParser: true });
// app.use("/", indexRouter);
// app.use("/login", loginRouter);
// app.use("/cars", carRouter);
// app.use("/sells", sellRouter);
// app.use("/complaints", complaintRouter);
app.listen(3000);