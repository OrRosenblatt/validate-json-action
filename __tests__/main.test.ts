import * as os from 'os';
import * as process from 'process';
import * as path from 'path';
import * as cp from 'child_process';
import { MockedConfig } from './mocks/mocked-config';

let mockedConfig: MockedConfig;
let ip: string;

describe('Run tests', () => {
    beforeEach(() => {
        ip = path.join(__dirname, '..', 'lib', 'main.js');
        mockedConfig = new MockedConfig();
    });

    afterEach(() => {
        ip = '';
        mockedConfig.resetAll();
        jest.resetAllMocks();
    });

    test('All inputs are set and valid', () => {
        // Arrange
        mockedConfig.mockValue('SCHEMA', './mocks/schema/valid.json');
        mockedConfig.mockValue('JSONS', './mocks/tested-data/valid.json');

        mockedConfig.set();

        const options: cp.ExecOptions = {
            env: process.env,
        };

        try {
            // Act
            const result = cp.execSync(`node ${ip}`, options);

            // Assert
            expect(result.toString()).toContain(`::set-output name=INVALID,::${os.EOL}`);
        } catch (ex) {
            expect(ex).toBeUndefined();
        }
    });
});
