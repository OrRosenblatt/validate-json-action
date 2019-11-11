"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidJsonFileError extends Error {
    constructor(fileName, innerError) {
        super();
        this.innerError = innerError;
        this.fileName = fileName;
    }
}
exports.InvalidJsonFileError = InvalidJsonFileError;
class InvalidSchemaError extends Error {
    constructor(reason) {
        super();
        this.reason = reason;
    }
}
exports.InvalidSchemaError = InvalidSchemaError;
class InvalidJsonError extends Error {
    constructor(reason, enrichedError) {
        super();
        this.reason = reason;
        this.enrichedError = enrichedError;
    }
}
exports.InvalidJsonError = InvalidJsonError;
