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
  origin: "https://client.maher.life",
  optionsSuccessStatus: 200,
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
