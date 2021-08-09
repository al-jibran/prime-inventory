import { last as lastItem, first as firstItem } from "lodash";

export const createCursor = (payload) => {
  return Buffer.from(JSON.stringify(payload)).toString("base64");
};

export const parseCursor = (cursor) => {
  return JSON.parse(Buffer.from(cursor, "base64").toString());
};

export const paginateResults = async (options, getList, getCount) => {
  const { after, first, orderDirection, orderBy, search } = options;
  const parsedCursor = after ? parseCursor(after) : null;

  const data = await getList(
    parsedCursor,
    first,
    orderDirection,
    orderBy,
    search
  );
  const countAfter = await getCount();

  const edges = data.map((node) => ({
    node,
    cursor: createCursor({ id: node._id, created: node.created }),
  }));

  const remaining = countAfter - edges.length;

  const pageInfo = {
    startCursor: edges.length ? firstItem(edges).cursor : null,
    endCursor: edges.length ? lastItem(edges).cursor : null,
    hasNextPage: remaining > 0,
  };

  return {
    edges,
    pageInfo,
    totalCount: edges.length,
  };
};
