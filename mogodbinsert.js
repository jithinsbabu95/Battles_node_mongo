const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");

// let url = "mongodb://username:password@localhost:27017/";
let url= "mongodb://admin:admin@cluster0-shard-00-00.jbzq2.mongodb.net:27017,cluster0-shard-00-01.jbzq2.mongodb.net:27017,cluster0-shard-00-02.jbzq2.mongodb.net:27017/test?ssl=true&replicaSet=atlas-zlobll-shard-0&authSource=admin&retryWrites=true&w=majority"
let stream = fs.createReadStream("C:\\Users\\jithi\\Downloads\\battles.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data" , function(data) {
    csvData.push({
        "name": data[0],
        "year": data[1],
        "battle_number":data[2],
        "attacker_king":data[3],
        "defender_king":data[4],
        "attacker_1":data[5],
        "attacker_2":data[6],
        "attacker_3":data[7],
        "attacker_4":data[8],
        "defender_1":data[9],
        "defender_2":data[10],
        "defender_3":data[11],
        "defender_4":data[12],
        "attacker_outcome":data[13],
        "battle_type":data[14],
        "major_death":data[15],
        "major_capture":data[16],
        "attacker_size":data[17],
        "defender_size":data[18],
        "attacker_commander":data[19],
        "defender_commander":data[20],
        "summer":data[21],
        "location":data[22],
        "region":data[23],
        "note":data[24]
      });
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("test")
          .collection("battles")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);