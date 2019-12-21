const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const books = require("./routes/api/books");
const chat = require("./routes/api/chat");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.json());

//DB Config

const db = config.get("mongoURI"); //MongoURI specified in config file

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

//Use file for any route starting with /api/user
app.use("/api/users", users);

//Login route
app.use("/api/auth", auth);

//Books route
app.use("/api/books", books);

app.use("/api/chat", chat);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

io.on("connection", function(client) {
	console.log("Client connected...");
	client.on("join", function(data) {
		console.log(data);
	});
	client.on();
});
