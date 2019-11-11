"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const errors_1 = require("./errors");
exports.prettyLog = (fileName, error) => {
    const prettyFileName = chalk_1.default `{grey {bold {underline ${fileName}}}}\n`;
    const prettyMessagePrefix = error ? chalk_1.default `{red {bold ✗}}` : chalk_1.default `{green {bold ✓}}`;
    let output = `${prettyMessagePrefix}${prettyFileName}`;
    switch (true) {
        case error instanceof errors_1.InvalidSchemaError:
            const schemaErr = error;
            output = `${output}${schemaErr.reason}`;
            break;
        case error instanceof errors_1.InvalidJsonError:
            const jsonErr = error;
            output = `${output}${jsonErr.enrichedError || jsonErr.reason}`;
            break;
        case error instanceof errors_1.InvalidJsonFileError:
            const fileErr = error;
            const reason = fileErr === undefined
                ? ''
                : fileErr instanceof Error
                    ? `${fileErr.name}${fileErr.message}`
                    : fileErr['message'] || '';
            output = `${output}${reason}`;
            break;
        case error instanceof Error:
            const err = error;
            output = output.concat(err.message || '');
            break;
        default:
            break;
    }
    console.log(output);
};
