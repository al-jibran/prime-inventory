export const createProductTransaction = (change, product) => {
  const stockBefore = product.stock ? product.stock : 0;

  const transactionChange = [
    {
      productId: product._id,
      name: change.name,
      change: change.stock,
      stockBefore,
    },
  ];
  return createTransaction("PRODUCT", {
    comment: change.comment,
    changes: transactionChange,
  });
};

export const createBillTransaction = async (bill, productCollection) => {
  const changesPromise = bill.entries.map(async (entry) => {
    const product = await productCollection.findOneById(entry._id);
    return {
      productId: entry._id,
      change: entry.stock,
      name: product.name,
      stockBefore: product.stock,
    };
  });

  const changes = await Promise.all(changesPromise);

  return createTransaction("BILL", { comment: bill.comment, changes });
};

const createTransaction = (type, change) => {
  return {
    comment: change.comment,
    type,
    changes: change.changes,
  };
};
