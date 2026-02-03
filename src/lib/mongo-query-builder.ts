import env from "../../env";

const queryBuilder = {
  buildFind({ query = {} } = {}) {
    const {
      sort = false,
      limit = env.API_DEFAUT_LIMIT,
      ...rest
    } = query;
    const mongooseQuery = this.extractQuery(rest);
    const mongooseSort = this.extractSort(sort);
    // TODO Pagination!
    // {skip:10}, {limit:50}
    // const mongooseLimit      = this.extractLimit(perPage)
    // const mongooseSkip       = this.extractSkip(page,perPage)

    const findObjectParams = {
      filter: mongooseQuery,
      projection: {},
      options: {
        ...mongooseSort,
        limit,
      },
    };
    console.log(JSON.stringify(findObjectParams, null, 2));
    return findObjectParams;
  },
  extractQuery(queryRest) {
    return { ...queryRest };
  },
  extractSort(sort) {
    const sortOptions: Record<string, number> = {};
    if (sort) {
      if (sort.includes("-")) {
        const cleanParam = sort.slice(1, sort.length); // remove - from param names
        sortOptions[cleanParam] = -1;
      }
      else {
        sortOptions[sort] = 1;
      }
    }
    return { sort: sortOptions };
  },

};

export { queryBuilder };
