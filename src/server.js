const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");
const handleSocketEvents = require("./socketHandler");
const app = express();

const corsOptions = {
  origin: 'https://14-sentences-frontend.vercel.app/',
};
app.use(cors(corsOptions));

const server = http.Server(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = 8080;

app.get("/", (_, res) => {
  res.send("Server is running");
});

io.on("connection", handleSocketEvents);

server.listen(port, () => console.log(`Listening on port ${port}`));
