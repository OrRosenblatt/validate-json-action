import { schemaValidator } from '../src/schema-validator';
import { InvalidSchemaError, InvalidJsonError } from '../src/errors';

import validSchema from './mocks/schema/valid.json';
import invalidSchema from './mocks/schema/invalid.json';

import validData from './mocks/tested-data/valid.json';
import invalidData from './mocks/tested-data/invalid_by_schema.json';

jest.mock('better-ajv-errors');
import betterAjvErrors from 'better-ajv-errors';

describe('Prepare and validate JSON schema', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
    });

    test('should return when schema is valid', async () => {
        const result = await schemaValidator.prepareSchema(validSchema);
        expect(result.errors).toBeNull();
        expect(result.schema).toMatchObject(validSchema);
    });

    test('should throw an error when schema is invalid', async () => {
        const task = schemaValidator.prepareSchema(invalidSchema);

        try {
            expect(await task).toThrow(InvalidSchemaError);
        } catch (e) {}
    });
});

describe('Validate JSON matches schema', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
    });

    test('should return true when validating JSON data that matches the schema', async () => {
        const mockedValidator = jest.fn().mockReturnValue(true);

        const result = await schemaValidator.validate(validData, mockedValidator);
        expect(result).toBe(true);
        expect(mockedValidator).toHaveBeenCalled();
        expect(betterAjvErrors).not.toHaveBeenCalled();
    });

    test("should throw an error when validating JSON data that doesn't match the schema", async () => {
        const mockedValidator = jest.fn().mockReturnValue(false);
        (betterAjvErrors as jest.Mock<any>).mockImplementation(() => 'Some errors');

        const task = schemaValidator.validate(invalidData, mockedValidator);

        try {
            expect(await task).toThrow(InvalidJsonError);
        } catch (e) {
            const err = e as InvalidJsonError;
            expect(err.enrichedError).toEqual('Some errors');
            expect(mockedValidator).toHaveBeenCalled();
            expect(betterAjvErrors).toHaveBeenCalled();
        }
    });
});
