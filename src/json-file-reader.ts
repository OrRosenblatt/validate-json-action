import fs from 'fs';
import { InvalidJsonFileError } from './errors';

export const getJson = async (filePath: string): Promise<object> => {
    try {
        const fileContents = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
        const json = JSON.parse(fileContents);
        return json;
    } catch (ex: any) {
        throw new InvalidJsonFileError(filePath, ex);
    }
};
