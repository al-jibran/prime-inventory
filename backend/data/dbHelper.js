import faker from "faker";
import { ObjectId } from "mongodb";

const seed = faker.seed(1500);

const products = Array.from(Array(10), () => ({
  name: faker.commerce.productName(),
  brand: faker.company.companyName(),
  stock: faker.datatype.number(seed),
  history: [new ObjectId()],
}));

// Creating a product with 3 transaction ids in history for testing delete.
products.unshift({
  name: faker.commerce.productName(),
  brand: faker.company.companyName(),
  stock: faker.datatype.number(seed),
  history: Array.from(Array(3), () => new ObjectId()),
});

const seedData = async (collection) => {
  try {
    return await collection.insertMany(products);
  } catch (error) {
    console.log(error);
  }
};

const getCount = async (collection) => {
  try {
    return await collection.countDocuments();
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (collection) => {
  try {
    return await collection.find({}).toArray();
  } catch (error) {
    console.log(error);
  }
};

const get = async (condition, size, collection) => {
  try {
    if (size === 1) {
      const products = await collection.find(condition).limit(size).toArray();
      return products[0];
    }

    return products;
  } catch (error) {
    console.log(error);
  }
};

export default { seedData, getAll, getCount, get };
