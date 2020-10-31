const dotenv = require('dotenv').config();
const express = require("express");
const informationRouter = require("./routes/information.js");
const Information = require("./models/Information");
const cors = require("cors");
const Sequelize = require("sequelize");

Information.sync();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/information", informationRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on : ${port}`);
});

