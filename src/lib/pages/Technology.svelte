<script lang="ts">
    import Page from './Page.svelte'

    const technologies = [
        [
            {
                name: 'JavaScript',
                value: '/icons/javascript.svg'
            },
            {
                name: 'TypeScript',
                value: '/icons/typescript.svg'
            },
            {
                name: 'Svelte',
                value: '/icons/svelte.svg'
            },
            {
                name: 'React',
                value: '/icons/react.svg'
            }
        ],
        [
            {
                name: 'Python',
                value: '/icons/python.svg'
            },
            {
                name: 'Java',
                value: '/icons/java.svg'
            },
            {
                name: 'C#',
                value: '/icons/csharp.svg'
            },
            {
                name: 'Lua',
                value: '/icons/lua.svg'
            }
        ]
    ]

    const programs = [
        [
            'WebStorm',
            'IntelliJ'
        ],
        [
            'GitHub',
            'FastMail'
        ]
    ]
</script>

<Page>
    <header slot="header">
        Technology I use
    </header>
    <div slot="content">
        <div class="quick">
            Languages / Frameworks
        </div>
        {#each technologies as row}
            <ul class="row">
                {#each row as item}
                    <li class="item">
                        <div class="icon">
                            <img src="{item.value}" alt=""/>
                        </div>
                        <span>
                            {item.name}
                        </span>
                    </li>
                {/each}
            </ul>
        {/each}
        <div class="quick">
            Programs / Services
        </div>
        {#each programs as row}
            <ul class="row">
                {#each row as item}
                    <li class="item">
                        {item}
                    </li>
                {/each}
            </ul>
        {/each}
    </div>
</Page>

<style>
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
        height: 2.25rem;
        padding: 0 0.5rem;

        display: flex;
        align-items: center;

        transition: color 200ms ease, background-color 300ms ease;
    }

    .item:hover {
        color: black;
        background-color: white;
    }

    .icon {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
    }

    .row {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media screen and (min-width: 720px) {
        .row {
            flex-direction: row;
        }

        .item {
            padding: 0 1rem;
            height: 4rem;
        }
    }
</style>