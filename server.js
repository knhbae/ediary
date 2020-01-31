// import express from "express";
// import { json, urlencoded } from "body-parser";
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

app.get("/api/objectItems", (req, res) => {
  connection.query("select * from object_item", (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/userEmotions", (req, res) => {
  connection.query("select * from User_Emotion", (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/userHistory", (req, res) => {
  connection.query(
    "select * from user_history where isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.post("/api/historys", (req, res) => {
  let sql = "insert into user_history values (null,?,?,now(),0)";
  let item = req.body.item;
  let emotion = req.body.emotion;
  console.log(item, emotion);
  let params = [item, emotion];
  connection.query(sql, params, (err, rows, fileds) => {
    res.send(rows);
  });
});

app.delete("/api/historys/:id", (req, res) => {
  let sql = "update user_history set isDeleted = 1 where id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
