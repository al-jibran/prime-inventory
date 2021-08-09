import { client, PORT } from "../connect";
import { ApolloServer, UserInputError } from "apollo-server";
import schema from "../src/graphql/schema";
import Product from "../src/collections/Product";
import Transaction from "../src/collections/Transaction";
import dbHelper from "../data/dbHelper";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../graphql/queries";
import { createTransaction } from "../src/utils/createTransaction";

const create = () => ({
  name: "Rice",
  stock: 100,
  brand: "Nourish",
  comment: "Delivered",
});

describe("Transactions", () => {
  let server, transactions, products;

  beforeAll(async () => {
    const cli = await client.connect();
    console.log("Connected to database.");

    products = cli.db().collection("products");
    transactions = cli.db().collection("transactions");

    server = new ApolloServer({
      schema,
      dataSources: () => ({
        products: new Product(products),
        transactions: new Transaction(transactions),
      }),
      context: () => ({ mongodbClient: client }),
    });
    await server.listen({ port: PORT });
  });

  beforeEach(async () => {
    await transactions.deleteMany({});
    await products.deleteMany({});
    const product = create();

    await server.executeOperation({
      query: CREATE_PRODUCT,
      variables: {
        product,
      },
    });
  });

  it("uses createTransaction function to create transactions", async () => {
    const product = await dbHelper.get({}, 1, products);
    const transaction = createTransaction("PRODUCT", create(), {
      _id: product._id,
    });

    // removing created property since it's a date and will always be different. Checking its presence is enough.
    expect(transaction).toHaveProperty("created");
    delete transaction.created;

    const transactionInDB = await dbHelper.get(
      { _id: product.history[0] },
      1,
      transactions
    );

    expect(transaction).toStrictEqual({
      comment: create().comment,
      type: "PRODUCT",
      changes: [
        { productId: product._id, stockBefore: 0, change: create().stock },
      ],
    });

    expect(transactionInDB).toMatchObject(transaction);
  });

  describe("when creating a product", () => {
    it("inserts transaction id in the history array of the product", async () => {
      const product = await dbHelper.get({}, 1, products);

      expect(product.history).toHaveLength(1);

      const transactionInDB = await dbHelper.get(
        { _id: product.history[0] },
        1,
        transactions
      );

      const transaction = createTransaction("PRODUCT", create(), {
        _id: product._id,
      });

      delete transaction.created;

      expect(transactionInDB).toMatchObject(transaction);
    });

    it("is atomic and cancels the transaction when creating the product fails", async () => {
      const product = create();
      delete product.name;
      const productsLengthBefore = await dbHelper.getCount(products);
      const transactionsLengthBefore = await dbHelper.getCount(transactions);

      const { errors } = await server.executeOperation({
        query: CREATE_PRODUCT,
        variables: { product },
      });

      expect(errors[0].extensions).toEqual(new UserInputError().extensions);

      const productsLengthAfter = await dbHelper.getCount(products);
      const transactionsLengthAfter = await dbHelper.getCount(transactions);

      expect(productsLengthAfter).toBe(productsLengthBefore);
      expect(transactionsLengthAfter).toBe(transactionsLengthBefore);
    });
  });

  describe("when updating a product", () => {
    it("inserts transaction id after modifying the product", async () => {
      const product = await dbHelper.get({}, 1, products);
      const transactionsLengthBefore = await dbHelper.getCount(transactions);

      const changes = {
        name: product.name,
        stock: -40,
        brand: product.brand,
        comment: "Shipment to XYZ traders",
      };

      const { data } = await server.executeOperation({
        query: UPDATE_PRODUCT,
        variables: { id: product._id, product: changes },
      });

      const received = data.updateProduct;
      const transactionsLengthAfter = await dbHelper.getCount(transactions);

      expect(received.history).toHaveLength(product.history.length + 1);
      expect(transactionsLengthAfter).toBe(transactionsLengthBefore + 1);

      const transactionsInDB = await dbHelper.getAll(transactions);
      const transactionIDs = transactionsInDB.map(
        (transaction) => transaction._id
      );

      // check that all the ids in the product's history are in the transaction collection.
      expect(transactionIDs).toEqual(expect.arrayContaining(received.history));
    });

    it("is atomic and cancels the transaction when updating the product fails", async () => {
      const productBefore = await dbHelper.get({}, 1, products);
      const transactionsLengthBefore = await dbHelper.getCount(transactions);

      const changes = {
        name: "Rice",
        brand: "Nourish",
        comment: "Shipment to XYZ traders",
      };

      const { errors } = await server.executeOperation({
        query: CREATE_PRODUCT,
        variables: { id: productBefore._id, product: changes },
      });

      expect(errors[0].extensions).toEqual(new UserInputError().extensions);

      const productAfter = await dbHelper.get(
        { _id: productBefore._id },
        1,
        products
      );

      const transactionsLengthAfter = await dbHelper.getCount(transactions);

      expect(productAfter).toEqual(productBefore);
      expect(transactionsLengthAfter).toBe(transactionsLengthBefore);
    });
  });

  afterAll(async () => {
    console.log("Closing database connection...");
    await client.close();
    console.log("Stopping the server...");
    await server.stop();
  });
});
