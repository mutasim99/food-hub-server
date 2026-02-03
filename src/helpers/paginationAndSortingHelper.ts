interface IOptions {
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: string;
}

type IOptionResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const paginationAndSortingHelper = (options: IOptions): IOptionResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 15;
  const sortBy: string = options.sortBy || "createdAt";
  const sortOrder: string = options.sortOrder || "desc";

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip,
  };
};

export default paginationAndSortingHelper;
