jest.setTimeout(10000);

import { ApolloServer, ForbiddenError, UserInputError } from "apollo-server";
import schema from "../src/graphql/schema";
import { client, PORT } from "../connect";
import { ObjectId } from "mongodb";
import dbHelper from "../data/dbHelper";
import Product from "../src/collections/Product";
import Transaction from "../src/collections/Transaction";
import { first, last } from "lodash";
import { parseCursor } from "../src/utils/pagination";

import {
  GET_INVENTORY,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../graphql/queries";
// Separate tests for transactions in a separate file.

describe("Products", () => {
  let server, products;

  beforeAll(async () => {
    const cli = await client.connect();
    console.log("Connected to database:", cli.db().databaseName);

    products = cli.db().collection("products");
    const transactions = cli.db().collection("transactions");

    server = new ApolloServer({
      schema,
      dataSources: () => ({
        products: new Product(products),
        transactions: new Transaction(transactions),
      }),
      context: () => {
        return { mongodbClient: cli };
      },
    });
    await server.listen({ port: PORT });

    await products.deleteMany({});
    await transactions.deleteMany({});
    await dbHelper.seedData(products);
  });

  describe("pagination", () => {
    it("returns the inventory with default size of 10 items", async () => {
      const { data } = await server.executeOperation({ query: GET_INVENTORY });
      const inventory = data.inventory;
      expect(inventory.totalCount).toBe(10);
      expect(inventory.edges.length).toBe(10);
    });

    it("returns the inventory with a given size", async () => {
      const { data } = await server.executeOperation({
        query: GET_INVENTORY,
        variables: {
          first: 5,
        },
      });
      expect(data.inventory.totalCount).toBe(5);
      expect(data.inventory.totalCount).toBe(data.inventory.edges.length);
    });

    it("has the correct edge matching with startCursor and endCursor", async () => {
      let { data } = await server.executeOperation({ query: GET_INVENTORY });

      const inventory = data.inventory;
      const pageInfo = inventory.pageInfo;

      expect(pageInfo.startCursor).toBe(first(inventory.edges).cursor);
      expect(pageInfo.endCursor).toBe(last(inventory.edges).cursor);
    });

    it("has the cursor that is encoded to contain the node id", async () => {
      let { data } = await server.executeOperation({ query: GET_INVENTORY });

      const cursorsParsed = data.inventory.edges.map((edge) => {
        const id = parseCursor(edge.cursor).id;
        return new ObjectId(id);
      });
      const nodeIds = data.inventory.edges.map((edge) => edge.node._id);

      expect(cursorsParsed).toEqual(nodeIds);
    });

    it("sets hasNextPage to false when there are no more items to display", async () => {
      const productCount = await dbHelper.getCount(products);
      const { data: data1 } = await server.executeOperation({
        query: GET_INVENTORY,
        variables: { first: productCount },
      });

      expect(data1.inventory.pageInfo.hasNextPage).toBe(false);

      const { data: data2 } = await server.executeOperation({
        query: GET_INVENTORY,
        variables: { first: productCount - 1 },
      });

      expect(data2.inventory.pageInfo.hasNextPage).toBe(true);
    });

    describe("ordering of items", () => {
      it("arranges products in descending (newest to oldest) when no orderDirection and orderBy is given", async () => {
        const allItems = await dbHelper.getCount(products);
        const { data: data1 } = await server.executeOperation({
          query: GET_INVENTORY,
          variables: { first: allItems },
        });

        const { data: data2 } = await server.executeOperation({
          query: GET_INVENTORY,
          variables: { first: allItems, orderDirection: "DESC" },
        });

        expect(data1).toStrictEqual(data2);

        const inventory = data1.inventory.edges;

        const result = inventory.map((edge) => edge.node._id.toString());

        // _id will be descending if they are arranged newest to oldest
        const isDescending = result.slice(1).every((e, i) => e < result[i]);
        expect(isDescending).toBe(true);
      });

      it("arranges products oldest to newest when orderDirection is ascending and no orderBy is given", async () => {
        const allItems = await dbHelper.getCount(products);

        const { data } = await server.executeOperation({
          query: GET_INVENTORY,
          variables: { first: allItems, orderDirection: "ASC" },
        });

        const inventory = data.inventory.edges;
        const result = inventory.map((edge) => edge.node._id.toString());
        const isAscending = result.slice(1).every((e, i) => e > result[i]);
        expect(isAscending).toBe(true);
      });

      it("arranges products in alphabetical order (ascending) by default when orderBy is Name", async () => {
        const allItems = await dbHelper.getCount(products);
        const { data: data1 } = await server.executeOperation({
          query: GET_INVENTORY,
          variables: { first: allItems, orderBy: "NAME" },
        });

        const { data: data2 } = await server.executeOperation({
          query: GET_INVENTORY,
          variables: {
            first: allItems,
            orderBy: "NAME",
            orderDirection: "ASC",
          },
        });

        expect(data1).toStrictEqual(data2);

        const inventory = data1.inventory.edges;

        const result = inventory.map((edge) => edge.node.name);

        const isAscending = result.slice(1).every((e, i) => e > result[i]);
        expect(isAscending).toBe(true);
      });

      it("arranges products in reverse alphabetical order when orderBy is NAME and orderDirection is DESC", async () => {
        const allItems = await dbHelper.getCount(products);

        const { data } = await server.executeOperation({
          query: GET_INVENTORY,
          variables: {
            first: allItems,
            orderDirection: "DESC",
            orderBy: "NAME",
          },
        });

        const inventory = data.inventory.edges;
        const result = inventory.map((edge) => edge.node.name);
        const isDescending = result.slice(1).every((e, i) => e < result[i]);
        expect(isDescending).toBe(true);
      });
    });
  });

  describe("get a single product", () => {
    it("return a single product with a given id", async () => {
      const product = await dbHelper.get({}, 1, products);
      const res = await server.executeOperation({
        query: GET_PRODUCT,
        variables: { id: product._id },
      });
      expect(res.data.product).toEqual(product);
    });

    it("throws an error when invalid id is provided", async () => {
      const res = await server.executeOperation({
        query: GET_PRODUCT,
        variables: { id: new ObjectId() },
      });
      expect(res.errors[0].message).toBe("Product was not found");
    });
  });

  describe("createProduct", () => {
    it("successfully inserts a product", async () => {
      const lengthBefore = await dbHelper.getCount(products);

      const product = {
        name: "Chana",
        stock: 10,
        brand: "Nourish",
        comment: "Delivered",
      };

      const res = await server.executeOperation({
        query: CREATE_PRODUCT,
        variables: { product },
      });

      const created = res.data.createProduct.node;
      const productsAfterCreate = await dbHelper.getAll(products);

      expect(productsAfterCreate).toHaveLength(lengthBefore + 1);
      expect(productsAfterCreate).toContainEqual(created);
    });
  });

  describe("updateProduct", () => {
    it("updates the product", async () => {
      const product = await dbHelper.get({}, 1, products);

      const update = {
        name: "Rice",
        stock: -10,
        brand: "Nourish",
        comment: "Shipment",
      };

      const res = await server.executeOperation({
        query: UPDATE_PRODUCT,
        variables: {
          id: product._id,
          change: update,
        },
      });

      // making sure we get the same product with the same id back.
      const afterChange = await dbHelper.get({ _id: product._id }, 1, products);
      expect(afterChange.stock).toBe(product.stock + update.stock);
      expect(res.data.updateProduct).toEqual(afterChange);
    });

    it("throws an error when a non-existent id is provided", async () => {
      const update = {
        name: "Rice",
        stock: -10,
        brand: "Nourish",
        comment: "Shipment",
      };

      const { errors } = await server.executeOperation({
        query: UPDATE_PRODUCT,
        variables: {
          id: new ObjectId(),
          change: update,
        },
      });

      expect(errors[0].message).toBe("Product was not found");
    });
  });

  describe("deleteProduct", () => {
    it("throws an error when the product has more than 1 transaction", async () => {
      const { _id } = await dbHelper.get(
        { "history.1": { $exists: true } },
        1,
        products
      );

      const { errors } = await server.executeOperation({
        query: DELETE_PRODUCT,
        variables: { id: _id },
      });

      expect(errors[0].extensions).toEqual(new ForbiddenError().extensions);
    });

    it("throws an error with non-existent id", async () => {
      const { errors } = await server.executeOperation({
        query: DELETE_PRODUCT,
        variables: { id: "1" },
      });

      expect(errors[0].extensions).toEqual(new UserInputError().extensions);
    });

    it("deletes a product successfully", async () => {
      const product = await dbHelper.get(
        { "history.1": { $exists: false } },
        1,
        products
      );
      const oldLength = await dbHelper.getCount(products);

      await server.executeOperation({
        query: DELETE_PRODUCT,
        variables: { id: product._id },
      });

      const newLength = await dbHelper.getCount(products);
      expect(newLength).toBe(oldLength - 1);

      const allProducts = await dbHelper.getAll(products);
      expect(allProducts).not.toContain(product);
    });
  });

  afterAll(async () => {
    console.log("Closing database connection...");
    await client.close();
    console.log("Stopping the server...");
    await server.stop();
  });
});
