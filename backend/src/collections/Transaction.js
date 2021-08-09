import { MongoDataSource } from "apollo-datasource-mongodb";
import { padStart } from "lodash";

const normalizeOrdering = function (cursor, first, sort, orderBy) {
  if (orderBy === "BILL") this.condition = { type: "BILL" };

  if (cursor) {
    if (orderBy === "BILL") {
      this.condition = {
        $and: [
          { created: { $lt: new Date(cursor.created) } },
          { type: "BILL" },
        ],
      };
    } else {
      this.condition = {
        created: { $lt: new Date(cursor.created) },
      };
    }
  }
  if (first) this.first = first;
  if (sort) this.sort = sort;
};

class Transaction extends MongoDataSource {
  constructor(collection) {
    super(collection);

    //Default values for sorting
    this.condition = {};
    this.sort = { created: -1 };
    this.first = 10;
  }

  async getTransactions(cursor, first, sort, orderBy) {
    normalizeOrdering.call(this, cursor, first, sort, orderBy);

    const res = this.collection.aggregate([
      { $match: this.condition },
      { $sort: this.sort },
      { $limit: this.first },
    ]);

    return await res.toArray();
  }

  async addTransaction(transaction, session = null) {
    if (transaction.type === "BILL") {
      const count = (await this.findByFields({ type: "BILL" })).length + 1;

      const billNo = padStart(count, 3, "0");
      console.log(billNo);
      transaction.bill_no = billNo;
    }
    transaction.created = new Date();

    const res = await this.collection.insertOne(transaction, { session });
    return res.insertedId;
  }

  async getCount() {
    return await this.collection.find(this.condition).sort(this.sort).count();
  }

  async getTransactionsOnDate(day, month, year) {
    const res = this.collection.aggregate([
      {
        $project: {
          doc: "$$ROOT",
          year: { $year: "$created" },
          month: { $month: "$created" },
          day: { $dayOfMonth: "$created" },
        },
      },
      { $match: { day, month, year } },
    ]);

    const result = await res.toArray();
    return result.map((res) => res.doc);
  }

  async getDates(month, year) {
    const res = this.collection.aggregate([
      {
        $project: {
          doc: "$$ROOT",
          year: { $year: "$created" },
          month: { $month: "$created" },
        },
      },
      { $match: { month, year } },
      {
        $group: {
          _id: { $dayOfMonth: "$doc.created" },
          date: { $first: "$doc.created" },
        },
      },
    ]);
    return await res.toArray();
  }
}

// {
// }

export default Transaction;
