<script lang="ts">
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'
    import HLine from '../lib/HLine.svelte'
    import VLine from '../lib/VLine.svelte'
    import Typewriter from '../lib/Typewriter.svelte'

    import Who from '../lib/pages/Who.svelte'
    import Technology from '../lib/pages/Technology.svelte'
    import Social from '../lib/pages/Social.svelte'

    const duration = 15000
    let timeLeft = duration
    let endTime = Date.now()

    let tableOfContents = [
        {
            name: 'who am i',
            path: 'who'
        },
        {
            name: 'work / tech',
            path: 'technology'
        },
        {
            name: 'social media',
            path: 'social'
        }
        // , {
        //     name: 'status',
        //     path: 'discord'
        // }
    ]
    let currentPage = tableOfContents.find((item) => '#' + item.path === $page.url.hash) ?? tableOfContents[0]

    let topics = [
        'An agile fox during the day; A developer after dawn...',
        'The moonlight shines on the arctic fox that is them...',
        'They code vigilantly at night, and sleep in the day...',
        'Making sure everything is in order, they rest after...',
        'Welcome to Zeko\'s Website; Thanks for looking around!'
    ]
    let selectedTopic = topics[0]

    function showNextTopic() {
        const topicIndex = topics.indexOf(selectedTopic)
        selectedTopic = topics[topicIndex + 1 >= topics.length ? 0 : topicIndex + 1]
    }

    function switchToTopic(index) {
        selectedTopic = topics[index]
        endTime = Date.now()
    }

    function switchToPage(index) {
        currentPage = tableOfContents[index]
    }

    onMount(() => {
        setInterval(() => {
            if (timeLeft <= 0) {
                endTime = Date.now()
                showNextTopic()
            }
        }, 200)

        setInterval(() => {
            timeLeft = Math.max((endTime + duration) - Date.now(), 0)
        }, 50)
    })
</script>

<svelte:head>
    <title>zeko.party / hectadecafox</title>
</svelte:head>

<div class="container">
    <div class="box">
        <div class="text">
            <div class="wrapper">
                <HLine/>
                <div class="typewriter">
                    {#key selectedTopic}
                        <div out:fade={{duration: 200}}>
                            <Typewriter text={selectedTopic}/>
                        </div>
                    {/key}
                </div>
                <HLine/>
            </div>
            <div>
                <HLine/>
                <div class="progress">
                    <div class="bar" style="width: {(timeLeft / duration).toFixed(2) * 100}%;"
                         transition:fade></div>
                </div>
                <div class="buttons">
                    {#each Object.keys(topics) as index}
                        {#if topics[index] === selectedTopic}
                            <button class="switch on" on:click={() => switchToTopic(index)}>
                                #{parseInt(index) + 1}</button>
                        {:else}
                            <button class="switch off" on:click={() => switchToTopic(index)}>
                                #{parseInt(index) + 1}</button>
                        {/if}
                    {/each}
                </div>
                <HLine/>
            </div>
        </div>
    </div>
    <div class="content">
        <div>
            <ul class="table">
                {#each tableOfContents as link}
                    {#if $page.url.hash === "#" + link.path}
                        <li class="active">
                            <a href="#{link.path}" on:click={() => switchToPage(tableOfContents.indexOf(link))}>
                                {tableOfContents.indexOf(link) + 1}. {link.name}
                            </a>
                        </li>
                    {:else}
                        <li>
                            <a href="#{link.path}" on:click={() => switchToPage(tableOfContents.indexOf(link))}>
                                {tableOfContents.indexOf(link) + 1}. {link.name}
                            </a>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
        <VLine/>
        <div>
            <main>
                <HLine/>
                {#key currentPage}
                    {#if currentPage.path === "who"}
                        <div in:fade={{delay: 300, duration: 300}} out:fade={{duration: 300}}>
                            <Who/>
                        </div>
                    {/if}
                    {#if currentPage.path === "technology"}
                        <div in:fade={{delay: 300, duration: 300}} out:fade={{duration: 300}}>
                            <Technology/>
                        </div>
                    {/if}
                    {#if currentPage.path === "social"}
                        <div in:fade={{delay: 300, duration: 300}} out:fade={{duration: 300}}>
                            <Social/>
                        </div>
                    {/if}
                {/key}
            </main>
        </div>
        <VLine/>
    </div>
</div>

<style>
    main {
        width: 100%;
        height: 37.5rem;
        padding: 0;
        overflow: hidden;
    }

    .table {
        width: 100%;
        margin-top: 1rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .content {
        display: flex;
        flex-direction: column;
    }

    .table > li {
        width: 100%;
        height: 2.5rem;

        display: flex;
    }

    .table > li:hover {
        background-color: #ffffff0f;
    }

    .table > li > a {
        width: 100%;
        height: 100%;
        padding: 1rem;

        font-size: small;

        display: flex;
        align-items: center;

        background-color: transparent;
        transition: background-color 200ms ease;
    }

    .table > li.active > a {
        background-color: #ffffff0f;
    }

    .table > li.active:after {
        content: '';

        height: 100%;
        width: 0.5rem;

        display: block;

        animation: opacity-fade-in 300ms ease forwards;
    }

    @keyframes opacity-fade-in {
        from {
            background-color: transparent;
        }
        to {
            background-color: white;
        }
    }

    .box {
        width: 100%;
        padding-top: 1px;
        padding-left: 2rem;
        padding-right: 2rem;

        display: flex;
    }

    .text {
        width: 80rem;
        height: 10rem;
        margin-top: 4rem;
        padding-top: 1px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .text > .wrapper {
        width: 20rem;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .typewriter {
        display: block;
        height: 4.5rem;
    }

    .buttons {
        margin-top: 1rem;

        display: flex;
    }

    .buttons > * + * {
        margin-left: 1rem;
    }

    .switch {
        width: 2rem;
        height: 2rem;

        color: transparent;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: color 200ms ease;
    }

    .switch.on {
        background-color: white;
    }

    .switch.on:hover {
        color: black;
    }

    .switch.off {
        background-color: transparent;

        outline: white solid 0.15rem;
        outline-offset: -0.15rem;
    }

    .switch.off:hover {
        color: white;
    }

    .progress {
        width: 100%;
        height: 0.5rem;
        margin-top: 1px;

        background-color: transparent;
    }

    .bar {
        height: 100%;

        background-color: white;

        transition: width 300ms ease;
    }

    @media screen and (min-width: 720px) {
        main {
            width: 80rem;
            height: 30rem;
            padding: 4rem 0;
        }

        .content {
            flex-direction: row;
        }

        .box {
            padding-left: 12rem;
            padding-right: 12rem;
        }

        .text {
            height: 24rem;
        }

        .text > .wrapper {
            width: 80rem;
        }

        .typewriter {
            height: 17rem;
        }

        .table {
            margin-top: 4rem;
            width: 12rem;
            flex-direction: column;
        }

        .progress {
            width: 50%;
        }

        .table > li {
            height: 3rem;
        }

        .table > li > a {
            font-size: medium;
        }
    }
</style>
