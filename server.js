const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const login = require("./routes/api/login");
const books = require("./routes/api/books");

const app = express();

app.use(express.json());

//DB Config

const db = require("./config/keys").mongoURI; //MongoURI specified in config file

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

//Use file for any route starting with /api/user
app.use("/api/users", users);

//Login route
app.use("/api/login", login);

//Books route
app.use("/api/books", books);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
