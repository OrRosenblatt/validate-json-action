import path from 'path';
import { getJson } from './json-file-reader';
import { schemaValidator } from './schema-validator';
import { prettyLog } from './logger';

export interface ValidationResult {
    fileName: string;
    valid: boolean;
}

export const validateJsons = async (
    sourceDir: string,
    schemaRelativePath: string,
    jsonRelativePaths: string[]
): Promise<ValidationResult[]> => {
    try {
        const schema = await getJson(sourceDir, schemaRelativePath);
        const validatorFunc = await schemaValidator.prepareSchema(schema);
        return await Promise.all(
            jsonRelativePaths.map(async relativePath => {
                const fileName = path.basename(relativePath);
                try {
                    const jsonData = await getJson(sourceDir, relativePath);
                    const result = await schemaValidator.validate(jsonData, validatorFunc);
                    return { fileName, valid: result };
                } catch (e) {
                    prettyLog(fileName, e);
                    return { fileName, valid: false };
                }
            })
        );
    } catch (err) {
        const schemaFileName = path.basename(schemaRelativePath);
        prettyLog(schemaFileName, err);
        return [{ fileName: schemaFileName || 'schema', valid: false }];
    }
};
