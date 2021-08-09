import { merge } from "lodash";
import { gql } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";

import DateTime from "./scalars/DateTime";
import MongoObjectID from "./scalars/MongoObjectID";

import Bill from "./types/Bill";
import PageInfo from "./types/PageInfo";
import Product from "./types/Product";
import ProductConnection from "./types/ProductConnection";
import ProductInput from "./types/ProductInput";
import Transactions from "./types/Transaction";
import TransactionConnection from "./types/TransactionConnection";

import Inventory from "./queries/inventory";
import ProductQuery from "./queries/product";
import TransactionQuery from "./queries/transactions";

import BulkUpdateProducts from "./mutations/bulkUpdateProducts";
import CreateProduct from "./mutations/createProduct";
import DeleteProduct from "./mutations/deleteProduct";
import UpdateProduct from "./mutations/updateProduct";

const rootTypeDefs = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [
  rootTypeDefs,
  DateTime.typeDefs,
  MongoObjectID.typeDefs,
  Bill.typeDefs,
  PageInfo.typeDefs,
  Product.typeDefs,
  ProductConnection.typeDefs,
  ProductInput.typeDefs,
  Transactions.typeDefs,
  TransactionConnection.typeDefs,
  Inventory.typeDefs,
  ProductQuery.typeDefs,
  TransactionQuery.typeDefs,
  BulkUpdateProducts.typeDefs,
  CreateProduct.typeDefs,
  DeleteProduct.typeDefs,
  UpdateProduct.typeDefs,
];

const resolvers = merge(
  DateTime.resolvers,
  MongoObjectID.resolvers,
  Bill.resolvers,
  PageInfo.resolvers,
  Product.resolvers,
  ProductConnection.resolvers,
  ProductInput.resolvers,
  Transactions.resolvers,
  TransactionConnection.resolvers,
  Inventory.resolvers,
  ProductQuery.resolvers,
  TransactionQuery.resolvers,
  BulkUpdateProducts.resolvers,
  CreateProduct.resolvers,
  DeleteProduct.resolvers,
  UpdateProduct.resolvers
);

export default makeExecutableSchema({ typeDefs, resolvers });
