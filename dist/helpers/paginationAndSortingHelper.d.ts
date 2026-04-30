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
declare const paginationAndSortingHelper: (options: IOptions) => IOptionResult;
export default paginationAndSortingHelper;
//# sourceMappingURL=paginationAndSortingHelper.d.ts.map