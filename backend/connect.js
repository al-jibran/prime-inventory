import { MongoClient } from "mongodb";
require("dotenv").config();

let databaseURI = process.env.MONGODB_DEV_URI;
export let PORT = process.env.PORT;

if (process.env.NODE_ENV === "test") {
  databaseURI = process.env.MONGODB_TEST_URI;
  PORT = 5000;
}

export const client = new MongoClient(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
