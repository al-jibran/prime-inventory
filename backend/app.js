import { ApolloServer } from "apollo-server";
import schema from "./src/graphql/schema";
import Product from "./src/collections/Product";
import Transaction from "./src/collections/Transaction";
import { client, PORT } from "./connect";

client
  .connect()
  .then(async (cli) => {
    console.log("Connected to database:", cli.db().databaseName);
    const transactions = cli.db().collection("transactions");
    const products = cli.db().collection("products");

    products.createIndex({ name: "text" }, (err, results) => {
      if (err) console.log(err);
      else console.log(results);
    });

    transactions.createIndexes(
      { created: 1 },
      { unique: true },
      (err, results) => {
        if (err) console.log(err);
        else console.log(results);
      }
    );
  })
  .catch((err) => console.log(err));

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    products: new Product(client.db().collection("products")),
    transactions: new Transaction(client.db().collection("transactions")),
  }),
  context: () => {
    return { mongodbClient: client };
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Listening on ${url}`);
});
