module.exports = (app) => {
  const battles = require("../controllers/battle.controller.js");

  var router = require("express").Router();

  router.get("/search", battles.search);

  router.get("/count", battles.count);

  router.get("/list", battles.list);

  // Retrieve a single battles with id
  router.get("/:id", battles.findOne);

  app.use("/api/battles", router);
};
