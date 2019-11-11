import * as core from '@actions/core';

export enum ConfigKey {
    GITHUB_WORKSPACE,
    SCHEMA,
    JSONS,
}

export type ConfigKeys = keyof typeof ConfigKey;

type KeyMapping = {
    key: ConfigKey;
    setup: 'ENV' | 'INPUT';
};

type Config = {
    [key in ConfigKeys]: string;
};

export const configMapping: KeyMapping[] = [
    {
        key: ConfigKey.GITHUB_WORKSPACE,
        setup: 'ENV',
    },
    { key: ConfigKey.SCHEMA, setup: 'INPUT' },
    { key: ConfigKey.JSONS, setup: 'INPUT' },
];

export function getConfig(): Config {
    let config = {};
    configMapping.forEach(i => {
        let value: string;
        switch (i.setup) {
            case 'ENV':
                value = <string>process.env[ConfigKey[i.key]];
                break;
            case 'INPUT':
                value = core.getInput(ConfigKey[i.key]);
                break;
            default:
                value = '';
                break;
        }
        core.debug(`${ConfigKey[i.key]}: ${value}`);
        config[ConfigKey[i.key]] = value;
    });
    return config as Config;
}
