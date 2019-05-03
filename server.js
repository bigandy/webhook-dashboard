const express = require("express");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http, { serveClient: true });
const path = require("path");

const { PORT } = require("./config");

app.use(express.static("frontend/public"));
app.use(express.json());

const ucFirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

io.on("connection", socket => {
  socket.emit("server-status", "CONNECTED TO SERVER");

  const people = ['andrew', 'ben', 'dan', 'marcus', 'rajinder'];
  people.forEach(person => {
    app.post(`/webhook/${person}`, (req, res) => {
      console.log(req.body);
      // if (req.headers['x-serene'] !== 'x-serene') {
      //   res.status(200);
      // }

      // const {sereneMode} = JSON.parse(Object.keys(req.body)[0]);

      // const message = {
      //   sereneMode,
      //   'user': ucFirst(person),
      // };

      // console.log(message);
      // socket.broadcast.emit("serene-mode", message);
    });
  });
});

http.listen(PORT, () => {
  console.log(`Socket.io server up and running on port http://localhost:${PORT}`);
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
