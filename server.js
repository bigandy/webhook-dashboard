const express = require("express");
const app = express();

const bodyParser = require('body-parser');

const http = require("http").Server(app);
const io = require("socket.io")(http, { serveClient: true });
const path = require("path");

const { PORT } = require("./config");

app.use(express.static("frontend/public"));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

io.on("connection", socket => {
  socket.emit("server-status", "CONNECTED TO SERVER");

	app.post('/webhook', function (req, res) {
		if (req.headers['x-serene'] !== 'x-serene') {
			res.status(200);
		}

		const body = JSON.parse(Object.keys(req.body)[0]);
		socket.broadcast.emit("serene-mode", body);
	});
});

http.listen(PORT, () => {
  console.log(`Socket.io server up and running on port ${PORT}`);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "frontend/index.html"));
});

http.on("error", error => {
  switch (error.code) {
    case "EADDRINUSE":
      console.error(`Port ${PORT} is taken`);
      break;
    default:
      throw error;
  }
});
