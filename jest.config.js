module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['js', 'ts'],
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    testRunner: 'jest-circus/runner',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    verbose: true,
    setupFilesAfterEnv: ['./__tests__/setup.ts'],
};
