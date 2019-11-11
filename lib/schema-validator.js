"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const better_ajv_errors_1 = __importDefault(require("better-ajv-errors"));
const errors_1 = require("./errors");
class SchemaValidator {
    constructor() {
        this.schemaValidator = new ajv_1.default({ allErrors: true, jsonPointers: true, loadSchema: this.loadSchema });
    }
    instance() {
        return this.schemaValidator;
    }
    async prepareSchema(schema) {
        const isSchemaValid = this.schemaValidator.validateSchema(schema);
        if (!isSchemaValid) {
            const errors = this.schemaValidator.errorsText(this.schemaValidator.errors);
            throw new errors_1.InvalidSchemaError(errors);
        }
        return await this.schemaValidator.compileAsync(schema);
    }
    async validate(data, validator) {
        const valid = await validator(data);
        if (!valid) {
            const errors = this.schemaValidator.errorsText(validator.errors);
            const output = better_ajv_errors_1.default(validator.schema, data, validator.errors, { format: 'cli', indent: 4 });
            throw new errors_1.InvalidJsonError(errors, (output || {}));
        }
        return valid;
    }
    async loadSchema() {
        return Promise.resolve(true);
    }
}
exports.schemaValidator = new SchemaValidator();
