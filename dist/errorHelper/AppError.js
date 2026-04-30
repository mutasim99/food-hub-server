class AppError extends Error {
    StatusCode;
    constructor(statusCode, message, stack = "") {
        super(message);
        this.StatusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default AppError;
//# sourceMappingURL=AppError.js.map