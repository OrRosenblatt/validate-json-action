import * as path from 'path';
import { ConfigKeys, ConfigKey, configMapping } from '../../src/configuration';

export class MockedConfig {
    private mockedConfig: {};

    constructor() {
        this.mockedConfig = {
            GITHUB_WORKSPACE: path.join(__dirname, '..'),
            INPUT_SCHEMA: '',
            INPUT_JSONS: '',
        };
    }

    public mockValue(key: ConfigKeys, value: string) {
        const keyMapping = configMapping.find((x) => ConfigKey[x.key] === key);
        if (keyMapping) {
            this.mockedConfig[keyMapping.setup === 'INPUT' ? `${keyMapping.setup}_${key}` : key] = value;
        }
    }

    public set(): void {
        for (const key in this.mockedConfig) {
            process.env[key] = this.mockedConfig[key];
        }
    }

    public resetAll(): void {
        for (const key in this.mockedConfig) {
            Reflect.deleteProperty(this.mockedConfig, key);
        }
    }
}
