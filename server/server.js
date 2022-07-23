const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const loginRoutes = require("./routes/login_routes");
const carRoutes = require("./routes/cars_routes");
const userRoutes = require('./routes/user_routes');
const sellRoutes = require("./routes/sells");
const complaintRoutes = require("./routes/complaints");
const cors = require('cors')
const app = express();
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");
// app.set("layout", "layouts/layout");
// app.use(expressLayouts);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/autoplac-db", { useNewUrlParser: true });
app.use(cors());
// app.use("/", indexRouter);
loginRoutes(app);
carRoutes(app);
userRoutes(app);
// app.use("/cars", carRouter);
// app.use("/sells", sellRouter);
// app.use("/complaints", complaintRouter);
app.listen(3333);
