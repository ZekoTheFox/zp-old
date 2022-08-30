<script lang="ts">
    import '../preflight.css'
    import CircleXIcon from 'svelte-tabler/CircleX.svelte'
    import HomeIcon from 'svelte-tabler/Home.svelte'
    import LinkIcon from 'svelte-tabler/Link.svelte'
    import ExternalLinkIcon from 'svelte-tabler/ExternalLink.svelte'
    import { fade } from 'svelte/transition'
    import sitemap, { search, PathType } from '../lib/sitemap'
    import { defaultConfiguration } from '../lib/config'

    let showSearch = false
    let searchInput = ''
    let searchTask = undefined
    let results = sitemap.filter((site) => site.shown)

    function handleKeyDown(event) {
        if (event.repeat) return

        switch (event.key) {
            case 'Escape': {
                switch (showSearch) {
                    case false: {
                        showSearch = true
                        console.log('showing search modal')
                        event.preventDefault()
                        break
                    }
                    case true: {
                        showSearch = false
                        break
                    }
                }
                break
            }
            case 'Enter': {
                if (document.activeElement === document.getElementById('search')) {
                    location.replace(results[0].path)
                    event.preventDefault()
                }
                break
            }
            case 'Shift':
            case 'Tab': {
                break
            }
            default: {
                if (showSearch) {
                    document.getElementById('search').focus()
                }

                break
            }
        }
    }

    function closeSearch() {
        if (showSearch && document.activeElement !== document.getElementById('search')) {
            showSearch = false
        }
    }

    function startSearching(event) {
        if (!event.repeat && event.key === 'Enter' && results.length > 0) {
            location.replace(location.origin + results[0].path)

            event.preventDefault()
            return
        }

        clearTimeout(searchTask)

        setTimeout(textSearch, 200)
    }

    function textSearch() {
        if (searchInput.trim().length <= 0) {
            results = sitemap
            return
        }

        let config = localStorage.getItem('config')

        if (config) {
            try {
                results = search(JSON.parse(config), searchInput)
                return
            } catch (_) {
                console.log('configuration invalid, falling back to default...')
            }
        }

        localStorage.setItem('config', JSON.stringify(defaultConfiguration))

        results = search(defaultConfiguration, searchInput)
    }
</script>

<svelte:window on:keydown={handleKeyDown}/>

{#if showSearch}
    <div transition:fade="{{duration: 50}}" class="modal" on:click={closeSearch}>
        <div class="box">
            <input id="search" class="search" type="text" placeholder="type to search..." bind:value={searchInput}
                   on:keydown={startSearching}>
            <div class="note">
                use tab / shift + tab to move up or down
            </div>
            <div id="results" class="results">
                {#each results as result}
                    {#if result.shown}
                        <a class="result" href="{result.path}" on:click={closeSearch}>
                        <span class="icon">
                            {#if result.type === PathType.INDEX}
                                <HomeIcon size="24"/>
                            {/if}
                            {#if result.type === PathType.INFORMATION}
                                <LinkIcon size="24"/>
                            {/if}
                            {#if result.type === PathType.EXTERNAL}
                                <ExternalLinkIcon size="24"/>
                            {/if}
                        </span>
                            <div class="info">
                                <div class="title">
                                    {result.name}
                                </div>
                                {#if result.description}
                                    <div class="description">
                                        {result.description}
                                    </div>
                                {/if}
                            </div>
                        </a>
                    {/if}
                {/each}
                <button class="result" type="button" on:click={closeSearch}>
                    <span class="icon">
                        <CircleXIcon size="24"/>
                    </span>
                    <span class="info">
                        <span class="title">
                            Close
                        </span>
                    </span>
                </button>
            </div>
        </div>
    </div>
{/if}
<div class="base">
    <slot/>
</div>

<style global>
    :root {
        color-scheme: dark light;
        scroll-behavior: smooth;
    }

    .base {
        height: 100vh;
        display: flex;
        align-items: center;
    }

    .modal {
        position: fixed;
        height: 100vh;
        width: 100%;

        display: flex;
        justify-content: center;
        padding-top: 10rem;

        background-color: #0909097f;

        z-index: 1;
    }

    .box {
        height: fit-content;

        display: flex;
        flex-direction: column;

        border-style: solid;
        border-width: 1px;
        border-color: #333;
        border-radius: 0.5rem;
        background-color: #111;

        overflow: hidden;
    }

    .search {
        width: 48rem;
        padding: 0.75rem;

        background-color: transparent;

        font-family: 'Outfit', sans-serif;
        font-weight: 500;
        font-size: 1.5rem;
    }

    .search:focus {
        outline: none;
    }

    .note {
        margin-left: 0.75rem;
        font-size: small;
        color: #666;
    }

    .results {
        width: 100%;
    }

    .result {
        width: 100%;
        padding: 0.75rem;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        cursor: pointer;

        transition: color 250ms ease, background-color 250ms ease;
    }

    .info {
        margin-left: 0.5rem;
    }

    .info > .title {
        font-weight: 500;
    }

    .info > .description {
        font-size: 0.75rem;
    }

    .result:focus, .result:hover {
        outline: none;
        background-color: #eee;
        color: black;
    }

    .icon {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.5rem;
    }
</style>