import fs from 'fs';
import path from 'path';
import { InvalidJsonFileError } from './errors';

export const getJson = async (repoDir: string, fileRelativePath: string): Promise<object> => {
    const fileName = path.basename(fileRelativePath);
    try {
        const filePath = path.join(repoDir, fileRelativePath);
        const fileContents = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
        const json = JSON.parse(fileContents);
        return json;
    } catch (ex) {
        throw new InvalidJsonFileError(fileName, ex);
    }
};
