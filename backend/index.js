const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const connectDatabase = require("./db/db");
const route = require("./Routes/route");
//env config
dotenv.config({ path: path.join(__dirname, ".", ".env") });

//cors
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));

// connect database
connectDatabase();

// Routes
app.use("/", route);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
