// import express from "express";
// import { json, urlencoded } from "body-parser";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/objectItems", (req, res) => {
  res.send([
    {
      id: 1,
      item: "#출근"
    },
    {
      id: 2,
      item: "#퇴근"
    }
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
