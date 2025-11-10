import * as path from 'path';
import { getJson } from './json-file-reader';
import { schemaValidator } from './schema-validator';
import { prettyLog } from './logger';

export interface ValidationResult {
    filePath: string;
    valid: boolean;
}

export const validateJsons = async (
    sourceDir: string,
    schemaRelativePath: string,
    jsonRelativePaths: string[]
): Promise<ValidationResult[]> => {
    const schemaPath = path.join(sourceDir, schemaRelativePath);
    try {
        const schema = await getJson(schemaPath);
        const validatorFunc = await schemaValidator.prepareSchema(schema);
        prettyLog(schemaPath);
        return await Promise.all(
            jsonRelativePaths.map(async (relativePath) => {
                const filePath = path.join(sourceDir, relativePath);
                try {
                    const jsonData = await getJson(filePath);
                    const result = await schemaValidator.validate(jsonData, validatorFunc);
                    prettyLog(filePath);
                    return { filePath, valid: result };
                } catch (e: any) {
                    prettyLog(filePath, e);
                    return { filePath, valid: false };
                }
            })
        );
    } catch (err: any) {
        prettyLog(schemaPath, err);
        return [{ filePath: schemaPath, valid: false }];
    }
};
