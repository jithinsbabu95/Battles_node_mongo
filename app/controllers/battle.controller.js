const db = require("../models");
const Battle = db.battle;

exports.search = (req, res) => {
  fields = {
    king: ["attacker_king", "defender_king"],
    location: "location",
    type: "battle_type",
  };
  var conditions = {}; //filters to be applied

  Object.keys(req.query).map((filter) => {
    //check is any filters are applied

    conditions["$and"] = [];
    if (filter === "king") {
      //in case multiple fields are to be queried for one filter
      let a = { $or: [] };
      fields[filter].map((element) => {
        a["$or"].push({ [element]: req.query[filter] });
      });
      conditions["$and"].push(a);
    } else {
      //filters with single values
      conditions["$and"].push({
        [fields[filter]]: req.query[filter],
      });
    }
  });
  Battle.find(conditions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.list = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Battle.distinct("location")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.count = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
 
  Battle.estimatedDocumentCount()
    .then((data) => {
      res.send({ count: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Battle.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Battle with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Battle with id=" + id });
    });
};
