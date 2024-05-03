class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        /* Determine the status based on the statusCode
         * If the statusCode starts with "4", set status to "failed", else set it to "error" */
        this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";

        // Indicates that this error is operational, not a programming error
        this.isOperational = true;

        /** Captures the stack trace at the point where the AppError instance is created.
         * It helps in debugging by providing information about where the
         * error occurred in the code
         */
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;