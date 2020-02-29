import * as core from '@actions/core';
import { getConfig, verifyConfigValues } from './configuration';
import { validateJsons } from './json-validator';

async function run() {
    try {
        const configuration = getConfig();
        const configurationErrors = verifyConfigValues(configuration);
        if (configurationErrors) {
            configurationErrors.forEach(e => core.error(e));
            core.setFailed('Missing configuration');
            return;
        }

        const jsonRelativePaths = configuration.JSONS.split(',');

        const validationResults = await validateJsons(
            configuration.GITHUB_WORKSPACE,
            configuration.SCHEMA,
            jsonRelativePaths
        );

        const invalidJsons = validationResults.filter(res => !res.valid).map(res => res.filePath);

        core.setOutput('INVALID', invalidJsons.length > 0 ? invalidJsons.join(',') : '');

        if (invalidJsons.length > 0) {
            core.setFailed('Failed to validate all JSON files.');
        } else {
            core.info(`✅ All files were validated successfully.`);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
