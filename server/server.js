const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const loginRoutes = require("./routes/login_routes");
const carRoutes = require("./routes/cars_routes");
const userRoutes = require('./routes/user_routes');
const sellRoutes = require("./routes/sell_routes");
const buyerRoutes = require("./routes/buyer_routes");
const complaintRoutes = require("./routes/complaints_routes");

const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/autoplac-db", { useNewUrlParser: true });
app.use(cors());

loginRoutes(app);
carRoutes(app);
userRoutes(app);
sellRoutes(app);
buyerRoutes(app);
complaintRoutes(app)

app.listen(3333);
