import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";
import { sortedIndexBy } from "lodash";

class Product extends MongoDataSource {
  constructor(collection) {
    super(collection);

    // Default values for querying the database.
    this.condition = {};
    this.sort = { _id: -1 };
    this.first = 10;
  }

  // Default direction for orderBy Name is ASC
  // Default direction for orderBy Created_at is DESC
  // In created_at DESC means newest to oldest and ASC means oldest to newest.
  async getInventory(cursor, first, orderDirection, orderBy, search = "") {
    if (cursor) {
      if (orderBy === "NAME") {
        const product = await this.findOneById(cursor.id);
        if (orderDirection === "DESC") {
          this.condition = { name: { $lt: product.name } };
        } else {
          this.condition = { name: { $gt: product.name } };
        }
      } else {
        if (orderDirection === "ASC") {
          this.condition = { _id: { $gt: new ObjectId(cursor.id) } };
        } else {
          this.condition = { _id: { $lt: new ObjectId(cursor.id) } };
        }
      }
    }
    if (first) this.first = first;
    if (orderDirection === "ASC") this.sort = { _id: 1 };
    if (orderBy === "NAME") {
      if (orderDirection === "DESC") {
        this.sort = { name: -1 };
      } else {
        this.sort = { name: 1 };
      }
    }

    if (search) {
      this.condition = { name: { $regex: new RegExp(`\\b${search}`, "i") } };
    }

    const res = this.collection.aggregate([
      { $match: this.condition },
      { $sort: this.sort },
      { $limit: this.first },
    ]);
    return await res.toArray();
  }

  async getProduct(id) {
    return await this.findOneById(id);
  }

  async getProductHistory(cursor, first = 10) {
    if (cursor) {
      this.condition = { _id: cursor.id };
    }

    const slice = cursor
      ? {
          $slice: [
            "$history",
            {
              $add: [
                {
                  $indexOfArray: ["$history", new ObjectId(cursor.id)],
                },
                1,
              ],
            },
            first,
          ],
        }
      : { $slice: ["$history", first] };

    console.time("history");
    const res = await this.collection
      .aggregate([
        {
          $match: { _id: this.product_id },
        },
        { $project: { history: { $reverseArray: "$history" } } },
        {
          $project: {
            _id: 0,
            history: {
              ...slice,
            },
          },
        },
        {
          $lookup: {
            from: "transactions",
            localField: "history",
            foreignField: "_id",
            as: "history",
          },
        },
        {
          $project: { history: { $reverseArray: "$history" } },
        },
      ])
      .toArray();
    console.timeEnd("history");
    return res[0].history;
  }

  async getHistoryCount() {
    console.time("count");
    const { history } = await this.findOneById(this.product_id);
    const hasId = Object.prototype.hasOwnProperty.call(this.condition, "_id");

    if (!hasId) {
      console.timeEnd("count");
      return history.length;
    }

    const itemsBefore = sortedIndexBy(
      history,
      this.condition._id,
      function (item) {
        return new ObjectId(item);
      }
    );
    console.timeEnd("count");
    return itemsBefore;
  }

  async addProduct(info, session = null) {
    const newProduct = {
      name: info.name,
      brand: info.brand,
      stock: info.stock,
      history: [],
    };

    const res = await this.collection.insertOne(newProduct, { session });
    return newProduct;
  }

  async updateProduct(id, updateParams, session = null) {
    const res = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updateParams,
      { returnDocument: "after", session }
    );

    return res.value;
  }

  async updateManyProducts(products, transactionId, session) {
    const res = await this.collection.bulkWrite(
      products.map((product) => {
        return {
          updateOne: {
            filter: { _id: product._id },
            update: {
              $inc: { stock: product.stock },
              $push: { history: transactionId },
            },
          },
        };
      }),
      { session, ordered: false }
    );

    return res;
  }

  async removeProduct(id, session = null) {
    return await this.collection.deleteOne(
      { _id: new ObjectId(id) },
      { session }
    );
  }

  async getCount() {
    return await this.collection.find(this.condition).sort(this.sort).count();
  }
}

export default Product;
