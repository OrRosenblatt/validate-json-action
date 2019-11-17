import chalk from 'chalk';
import { InvalidSchemaError, InvalidJsonError, InvalidJsonFileError } from './errors';

export const prettyLog = (filePath: string, error?: Error): void => {
    const prettyFilePath = chalk`{grey {bold {underline ${filePath}}}}`;
    const prettyMessagePrefix = error ? chalk`{red {bold ✗}} ` : chalk`{green {bold ✓}} `;
    let output = `${prettyMessagePrefix}${prettyFilePath}\n`;
    switch (true) {
        case error instanceof InvalidSchemaError:
            const schemaErr = error as InvalidSchemaError;
            output = `${output}${schemaErr.reason}`;
            break;
        case error instanceof InvalidJsonError:
            const jsonErr = error as InvalidJsonError;
            output = `${output}${jsonErr.enrichedError || jsonErr.reason}`;
            break;
        case error instanceof InvalidJsonFileError:
            const fileErr = error as InvalidJsonFileError;
            const reason =
                fileErr.innerError instanceof Error
                    ? `${fileErr.innerError.name}${fileErr.innerError.message}`
                    : fileErr.innerError || '';
            output = `${output}${reason}`;
            break;
        case error instanceof Error:
            const err = error as Error;
            output = `${output}${err.name} - ${err.message}\n${err.stack}`;
            break;
        default:
            break;
    }
    console.log(output);
};
