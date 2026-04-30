declare class AppError extends Error {
    StatusCode: number;
    constructor(statusCode: number, message: string, stack?: string);
}
export default AppError;
//# sourceMappingURL=AppError.d.ts.map