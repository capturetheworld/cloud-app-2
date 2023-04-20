import express from "express"
const app = express()
const port = 3000

import { Server } from "socket.io"

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)

const socketIo = new Server(server, {
  cors: {
    origin: "*", // Allow any origin for testing purposes. This should be changed on production.
  },
})

app.get("/", (req, res) => {
  res.send("Hello World!")
  console.log("Hello World!")
})

app.get("/info/timestamp", (req, res) => {
  res.send({ data: 0 })
})

app.put("/circuit/level", (req, res) => {
  console.log("PUT", req.body)
  res.send({ data: 0 })
  socketIo.emit("update", {
    key: "Circuit",
    value: {
      name: "ceilingFan",
      state: {
        value: Math.random(),
        level: 0,
        levelTs: 99,
      },
    },
  })
})
app.put("/circuit/scene/:id", (req, res) => {
  console.log("PUT", req.id)
  res.send({ data: 0 })
})

socketIo.on("connection", (socket) => {
  console.log("New connection created")

  // Get the auth token provided on handshake.
  const token = socket.handshake.auth.token
  console.log("Auth token", token)

  try {
    // Verify the token here and get user info from JWT token.
  } catch (error) {
    socket.disconnect(true)
  }

  // A client is disconnected.
  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })

  // Read message recieved from client.
  socket.on("ceilingFan", (data) => {
    console.log("ceilingFan: ", data)
  })

  // Send a message to the connected client 5 seconds after the connection is created.
  setTimeout(() => {
    socket.emit("update", {
      key: "Circuit",
      value: Math.random(),
      name: "ceilingFan",
    })
  }, 5_000)
})