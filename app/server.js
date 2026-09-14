let express = require("express");
let path = require("path");
let fs = require("fs");
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser");
let app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/profile-picture", function (req, res) {
    let img = fs.readFileSync(path.join(__dirname, "images/profile-picture"));
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(img, "binary");
});

// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
let mongoUrlDocker = "mongodb://admin:password@mongodb";
let databaseName = "my-db";

app.post("/update-profile", async function (req, res) {
    let userObj = req.body;
    userObj["userid"] = 1;

    let client;
    try {
        client = await MongoClient.connect(mongoUrlLocal);
        let db = client.db(databaseName);

        let myquery = { userid: 1 };
        let newvalues = { $set: userObj };

        await db
            .collection("users")
            .updateOne(myquery, newvalues, { upsert: true });
        res.send(userObj);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to update profile" });
    } finally {
        if (client) await client.close();
    }
});

app.get("/get-profile", async function (req, res) {
    let client;
    try {
        client = await MongoClient.connect(mongoUrlLocal);
        let db = client.db(databaseName);
        let myquery = { userid: 1 };

        let result = await db.collection("users").findOne(myquery);
        res.send(result ? result : {});
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to get profile" });
    } finally {
        if (client) await client.close();
    }
});
app.listen(3000, function () {
    console.log("app listening on port 3000!");
});
