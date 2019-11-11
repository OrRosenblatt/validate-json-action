"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const json_file_reader_1 = require("./json-file-reader");
const schema_validator_1 = require("./schema-validator");
const logger_1 = require("./logger");
exports.validateJsons = async (sourceDir, schemaRelativePath, jsonRelativePaths) => {
    try {
        const schema = await json_file_reader_1.getJson(sourceDir, schemaRelativePath);
        const validatorFunc = await schema_validator_1.schemaValidator.prepareSchema(schema);
        return await Promise.all(jsonRelativePaths.map(async (relativePath) => {
            const fileName = path_1.default.basename(relativePath);
            try {
                const jsonData = await json_file_reader_1.getJson(sourceDir, relativePath);
                const result = await schema_validator_1.schemaValidator.validate(jsonData, validatorFunc);
                return { fileName, valid: result };
            }
            catch (e) {
                logger_1.prettyLog(fileName, e);
                return { fileName, valid: false };
            }
        }));
    }
    catch (err) {
        const schemaFileName = path_1.default.basename(schemaRelativePath);
        logger_1.prettyLog(schemaFileName, err);
        return [{ fileName: schemaFileName || 'schema', valid: false }];
    }
};
