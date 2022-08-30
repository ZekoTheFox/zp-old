<script lang="ts">
    import Page from './Page.svelte'

    const data = [
        [
            {
                name: 'Pronouns',
                value: 'Any, They/Them or She/Her preferred'
            },
            {
                name: 'Language(s)',
                value: 'English'
            }
        ],
        [
            {
                name: 'Location',
                value: 'At my desk, In a cave, Underground'
            },
            {
                name: 'Damn',
                value: 'Daniel'
            }
        ]
    ]
</script>

<Page>
    <header slot="header">
        Hi, I'm Zeko
    </header>
    <div slot="content">
        <div class="block">
            I'm a freelance developer with interests in Web Development, as well in some Motion Design.
            <br>
            Usually I'm a fairly laid back and chill person, so if you see me in a public voice or text channel, feel
            free to say hello!
        </div>
        <div class="quick">
            Other facts
        </div>
        {#each data as row}
            <ul class="row">
                {#each row as item}
                    <li class="item">
                        <strong>
                            {item.name}:
                        </strong>
                        <span>
                            {item.value}
                        </span>
                    </li>
                {/each}
            </ul>
        {/each}
    </div>
</Page>

<style>
    .block {
        padding: 0 1rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    .quick {
        height: 3rem;
        padding: 0 1rem;

        border-bottom: 0.15rem solid white;

        font-weight: 700;

        display: flex;
        align-items: center;
    }

    .item {
        width: 100%;
        height: 4rem;
        padding: 0 1rem;

        display: flex;
        align-items: center;

        transition: color 200ms ease, background-color 300ms ease;
    }

    .item:hover {
        color: black;
        background-color: white;
    }

    .item > strong {
        margin-right: 0.75rem;
    }

    .row {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media screen and (min-width: 720px) {
        .item {
            padding: 0 1.5rem;
        }

        .row {
            flex-direction: row;
        }
    }
</style>