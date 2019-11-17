interface ValidationError {}

export class InvalidJsonFileError extends Error implements ValidationError {
    public filePath: string;
    public innerError: Error | object;

    constructor(filePath: string, innerError: Error | object) {
        super();
        this.innerError = innerError;
        this.filePath = filePath;
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
