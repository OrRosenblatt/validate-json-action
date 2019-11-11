"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const errors_1 = require("./errors");
exports.getJson = async (repoDir, fileRelativePath) => {
    const fileName = path_1.default.basename(fileRelativePath);
    try {
        const filePath = path_1.default.join(repoDir, fileRelativePath);
        const fileContents = await fs_1.default.promises.readFile(filePath, { encoding: 'utf-8' });
        const json = JSON.parse(fileContents);
        return json;
    }
    catch (ex) {
        throw new errors_1.InvalidJsonFileError(fileName, ex);
    }
};
