const errorMiddleware = (error, req, res, next) => {

    const statusCode = error.statusCode || 500;

    const code = error.code || "INTERNAL_ERROR";

    const message =
        error.statusCode
            ? error.message
            : "Ocurrió un error interno en el servidor.";

    return res.status(statusCode).json({
        status: "error",
        error: code,
        message: message,
    });

};

export default errorMiddleware;