import { getJson } from '../src/json-file-reader';
import excepted from './mocks/tested-data/valid.json';
import { InvalidJsonFileError } from '../src/errors';

const mocks_dir = './__tests__/mocks';

describe('Process a JSON file', () => {
    test('should return a valid JSON when procesings valid JSON file', async () => {
        const validJsonFile = 'tested-data/valid.json';

        const result = await getJson(mocks_dir, validJsonFile);
        expect(typeof result).toBe('object');

        Object.keys(excepted).forEach(key => {
            expect(result).toHaveProperty(key);
            expect(result[key]).toEqual(excepted[key]);
        });
    });

    test('should throw an error when procesing invalid JSON file', async () => {
        const invalidJsonFile = 'tested-data/invalid_by_format.json';

        const task = getJson(mocks_dir, invalidJsonFile);

        try {
            expect(await task).toThrowError(InvalidJsonFileError);
        } catch (e) {
            const err = e as InvalidJsonFileError;
            expect(err.fileName).toEqual('invalid_by_format.json');
        }
    });

    test("should throw an error when file or directory don't exist", async () => {
        const notExistingFile = 'no_such_file.json';

        const task = getJson(mocks_dir, notExistingFile);
        try {
            expect(await task).toThrowError(InvalidJsonFileError);
        } catch (e) {
            const err = e as InvalidJsonFileError;
            expect(err.fileName).toEqual('no_such_file.json');
            expect(typeof err.innerError).not.toBeUndefined();
            expect((<object>err.innerError)['code']).toBe('ENOENT');
        }
    });
});
