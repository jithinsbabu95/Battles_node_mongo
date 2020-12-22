const db = require("../models");
const Battle = db.battle;

exports.search = (req, res) => {
  try{
  fields = {
    king: ["attacker_king", "defender_king"],
    location: "location",
    type: "battle_type",
  };
  var conditions = {}; //filters to be applied

  Object.keys(req.query).map((filter) => {
    //check is any filters are applied

    
    if (filter === "king") {
      //in case multiple fields are to be queried for one filter
      let a = { $or: [] };
      fields[filter].map((element) => {
        a["$or"].push({ [element]: req.query[filter] });
      });
      
      conditions["$and"]?conditions["$and"].push(a):conditions["$and"]=[a];
    } else {
      let a={
        [fields[filter]]: req.query[filter],
      }
      //filters with single values
      conditions["$and"]?conditions["$and"].push(a):conditions["$and"]=[a];
    }
  });
  console.log(conditions);
  Battle.find(conditions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving battles.",
      });
    });
  }
  catch(err){
    res.status(500);
res.send('some error occured');
  }
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
          err.message || "Some error occurred while retrieving battless.",
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
          err.message || "Some error occurred while retrieving battless.",
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
