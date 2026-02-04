import env from "../../env";

const queryBuilder = {
  buildFind({ query = {} as any } = {}) {
    const {
      sort = false,
      limit = env.API_DEFAUT_LIMIT,
      ...rest
    } = query;
    const mongooseQuery = this.extractQuery(rest);
    const mongooseSort = this.extractSort(sort);

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
  extractQuery(queryRest: any) {
    return { ...queryRest };
  },
  extractSort(sort: string | string[]) {
    const sortOptions: Record<string, number> = {};
    if (sort) {
      const sortStr = Array.isArray(sort) ? sort[0] : sort;
      if (sortStr.includes("-")) {
        const cleanParam = sortStr.slice(1);
        sortOptions[cleanParam] = -1;
      }
      else {
        sortOptions[sortStr] = 1;
      }
    }
    return { sort: sortOptions };
  },

};

export { queryBuilder };
