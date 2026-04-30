const paginationAndSortingHelper = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 15;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";
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
//# sourceMappingURL=paginationAndSortingHelper.js.map