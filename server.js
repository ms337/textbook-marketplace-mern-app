const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/user");

const app = express();

//Bodyparser has Middleware which needs to be added

app.use(bodyParser.json());

//DB Config

const db = require("./config/keys").mongoURI; //MongoURI specified in config file

mongoose
	.connect(db)
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

//Use file for any route starting with /api/user
app.use("/api/user", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
