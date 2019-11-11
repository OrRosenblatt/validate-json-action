interface ValidationError {}

export class InvalidJsonFileError extends Error implements ValidationError {
    public fileName: string;
    public innerError?: Error | object;

    constructor(fileName: string, innerError?: Error | object) {
        super();
        this.innerError = innerError;
        this.fileName = fileName;
    }
}

export class InvalidSchemaError extends Error implements ValidationError {
    public reason: string;

    constructor(reason: string) {
        super();
        this.reason = reason;
    }
}

export class InvalidJsonError extends Error implements ValidationError {
    public reason: string;
    public enrichedError?: string;

    constructor(reason: string, enrichedError?: string) {
        super();
        this.reason = reason;
        this.enrichedError = enrichedError;
    }
}
