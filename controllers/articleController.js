// const db = require("../models");
var express = require("express");
var app = express();
var path = require("path");
var Article = require("./../models/article.js");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public/", "index.html"));
  });

  app.get("/favicon.ico", function (req, res) {
    res.send(204);
  });

  app.post("/api/saved", function (req, res) {
    var newArticle = new Article(req.body);

    newArticle.save(function (err, doc) {
      if (err) {
        res.send(err)
      }else {
        res.json(doc)
      }
    });
  });

  app.get("/api/saved", function (req, res) {
    Article.find({}, function (err, doc) {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
  });

  //deleting what the user chooses to delete
  app.delete("/api/saved/:id", function(req, res){
    Article.findByIdAndRemove(req.params.id, function (error, doc) {
      if (error) {
        res.send(error);
      } else{
        res.send(doc);
      }
    });
  });
};


