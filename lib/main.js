"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const configuration_1 = require("./configuration");
const json_validator_1 = require("./json-validator");
async function run() {
    try {
        const configuration = configuration_1.getConfig();
        const jsonRelativePaths = configuration.JSONS.split(',');
        const validationResults = await json_validator_1.validateJsons(configuration.GITHUB_WORKSPACE, configuration.SCHEMA, jsonRelativePaths);
        const invalidJsons = validationResults.filter(res => !res.valid).map(res => res.fileName);
        core.setOutput('INVALID', invalidJsons.length > 0 ? invalidJsons.join(',') : '');
        if (invalidJsons.length > 0) {
            core.setFailed('Failed to validate all JSON files.');
        }
        else {
            core.info(`:tada: All files were validate succesfully`);
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run();
