<script lang="ts">
    import Page from './Page.svelte'

    const links = [
        {
            name: 'Twitter',
            value: '@ZekoTheFox',
            url: 'https://twitter.com/ZekoTheFox'
        },
        {
            name: 'GitHub',
            value: 'ZekoTheFox',
            url: 'https://github.com/ZekoTheFox'
        },
        {
            name: 'Twitch',
            value: 'ZekoTheFox',
            url: 'https://twitch.tv/ZekoTheFox'
        },
        {
            name: 'Steam',
            value: 'zekothefox',
            url: 'https://steamcommunity.com/id/zekothefox'
        }
    ]
</script>

<Page>
    <header slot="header">
        Social Media
    </header>
    <div slot="content">
        <div class="block">
            {#each links as link}
                <div class="item">
                    <span>{link.name}:</span>
                    <a href="{link.url}">{link.value}</a>
                </div>
            {/each}
        </div>
    </div>
</Page>

<style>
    .block {
        padding: 0 1rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    .block a {
        margin-left: 0.5rem;

        color: white;
        text-decoration: underline;

        transition: color 200ms ease;
    }

    .block a:hover {
        color: #8b44ea;
    }

    .item {
        display: flex;
    }

    @media screen and (min-width: 720px) {
    }
</style>