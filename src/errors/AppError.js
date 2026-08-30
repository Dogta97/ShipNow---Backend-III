class AppError extends Error {

    constructor(errorType) {

        super(errorType.message);

        this.name = "AppError";
        this.code = errorType.code;
        this.statusCode = errorType.statusCode;

        Error.captureStackTrace(
            this,
            this.constructor
        );
    }

}

export default AppError;