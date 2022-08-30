export interface ConfigNumberNode {
    name: string
    description: string
    value: number
    dependsOn?: string[]
}

export interface ConfigBooleanNode {
    name: string
    description: string
    state: boolean,
    dependsOn?: string[]
}

export type ConfigNode = ConfigNumberNode | ConfigBooleanNode
export type WebsiteConfig = Record<string, ConfigNode>

export const defaultConfiguration: WebsiteConfig = {
    'fuzzy_search': {
        name: '"Fuzzy" Search',
        description: 'Does input char assumptions with the input in looking for similarities. May affect performance.',
        state: true
    }
}

export function getConfigValue(configuration: WebsiteConfig, id: string) {
    const keys = Object.keys(defaultConfiguration)
    return configuration[keys[keys.indexOf(id)]] as ConfigNode
}

export default function useConfig(): WebsiteConfig {
    const configuration: string | null = localStorage.getItem('config')

    if (configuration) {
        let config: WebsiteConfig = defaultConfiguration
        // try to parse the site configuration
        try {
            config = JSON.parse(configuration) as WebsiteConfig
        } catch (e) {
            // failed, just return a known working one instead (aka default config)
            console.log('invalid or corrupt config! falling back to default...')
        }

        return config
    }

    // config doesn't exist, so lets save a new one
    localStorage.setItem('config', JSON.stringify(defaultConfiguration))

    // the config is already default regardless, so just return the same thing
    return defaultConfiguration
}