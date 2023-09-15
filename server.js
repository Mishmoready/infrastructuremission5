const http = require("http");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const url = "mongodb://mongo:27017";
const dbName = "helloWorldDB";

const hostname = "0.0.0.0";
const port = 3000;

const server = http.createServer(async (req, res) => {
  // Apply CORS here
  cors()(req, res, async () => {
    // <-- apply the cors middleware
    let client;
    try {
      client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = client.db(dbName);
      const collection = db.collection("messages");
      await collection.insertOne({ message: "Hello World" });

      const messages = await collection.find({}).toArray();

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(messages));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end("Failed to connect to DB");
    } finally {
      client.close();
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
