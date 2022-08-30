import { getConfigValue } from './config'
import type { ConfigBooleanNode, WebsiteConfig } from './config'

export enum PathType {
    INDEX,
    INFORMATION,
    EXTERNAL
}

interface SitePath {
    name: string
    path: string
    type: PathType
    shown: boolean
    description?: string
    keywords?: string[]
    linked?: string[]
}

const sitemap: SitePath[] = [
    {
        name: 'Index Page',
        path: '/',
        type: PathType.INDEX,
        shown: true,
        description: 'The landing page for Zeko\'s website.',
        keywords: ['home', 'index', 'landing', 'start']
    },
    // Socials
    {
        name: 'Discord',
        path: 'https://zeko.party/discord',
        type: PathType.EXTERNAL,
        shown: false,
        keywords: ['social', 'media', 'steam', 'game', 'gaming']
    },
    {
        name: 'Twitter',
        path: 'https://twitter.com/ZekoTheFox',
        type: PathType.EXTERNAL,
        shown: true,
        keywords: ['social', 'media', 'twitter', 'bird']
    },
    {
        name: 'Twitch',
        path: 'https://twitch.tv/ZekoTheFox',
        type: PathType.EXTERNAL,
        shown: true,
        keywords: ['social', 'media', 'stream', 'twitch', 'streaming']
    },
    {
        name: 'GitHub',
        path: 'https://github.com/ZekoTheFox',
        type: PathType.EXTERNAL,
        shown: true,
        keywords: ['git', 'github', 'dev', 'development', 'developer']
    },
    {
        name: 'Steam',
        path: 'https://steamcommunity.com/id/zekothefox',
        type: PathType.EXTERNAL,
        shown: true,
        keywords: ['steam', 'game', 'gaming']
    }
]

export default sitemap

// string: 1234567890qwertyuiopasdfghjkl;zxcvbnm,./
const rows =
    '1234567890' +
    'qwertyuiop' +
    'asdfghjkl;' +
    'zxcvbnm,./'

// how this works:
// we know that in the array, there will always be a static offset to get the keys around a single key.
// i.e.: if the key `4` is checked, then we know that it could also mean:
//     - `3` (-1) -> `4` (0) -> `5` (+1) ...
//     - `e` (+9) -> `r` (+10) -> `t` (+11) ...
//
// we always know that the key will stay in the same place, so adding 10 to the original index will always
//   return to the key below the original key/index
function fuzzyMatch(input: string, target: string) {
    const inputWords: string[] = input.split(' ')
    const targetWords: string[] = target.split(' ')

    function walkWord(inputWord: string, targetWord: string) {
        for (let letterIndex = 0; letterIndex < inputWord.length; letterIndex++) {
            const center = rows.indexOf(inputWord[letterIndex])

            const points = [
                -11, -10, -9,
                -1, 0, 1,
                9, 10, 11
            ]
            // gather letters
            const potentialLetters = []
            for (const point of points) {
                // take center and offset it
                const keyIndex = center + point
                // check to see if it would go out of bounds
                if (keyIndex > 0 && keyIndex < rows.length) {
                    // check boundaries of physical letters
                    if (keyIndex + 1 % 10 === 0 || keyIndex + 1 % 10 === 9) {
                        continue
                    }
                    // add found letter
                    potentialLetters.push(rows[keyIndex])
                }
            }
            for (const letter of potentialLetters) {
                const modifiedWord = inputWord.split('').map((char, index) => index === letterIndex ? letter : char).join('')
                if (targetWord.toLowerCase().trim().includes(modifiedWord.toLowerCase().trim())) {
                    return true
                }
            }
        }
    }

    for (const word of inputWords) {
        for (const targetWord of targetWords) {
            if (walkWord(word, targetWord)) {
                return true
            }
        }
    }
}

export function search(config: WebsiteConfig, term: string) {
    const results: SitePath[] = []
    const loweredTerm = term.toLowerCase()
    const fuzzySearch = (getConfigValue(config, 'fuzzy_search') as ConfigBooleanNode).state

    if (fuzzySearch) {
        for (const path of sitemap) {
            if (fuzzyMatch(term, path.name) || (path.description && fuzzyMatch(term, path.description))) {
                results.push(path)
            }

            if (path.keywords && !results.some((value) => value.path === path.path)) {
                for (const keyword of path.keywords) {
                    if (fuzzyMatch(term, keyword)) {
                        results.push(path)
                    }
                }
            }
        }
        // welcome to the pyramid

        return results
    }

    sitemap.forEach((path) => {
        if (path.name.toLowerCase().includes(loweredTerm)
            || (path.description && path.description.toLowerCase().includes(loweredTerm))
            || path.path.toLowerCase().includes(loweredTerm)) {
            results.push(path)
        }
    })

    return results
}
