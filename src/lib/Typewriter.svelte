<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte'
    import { fade } from 'svelte/transition'
    import { expoOut } from 'svelte/easing'

    export let text = ''
    const words = text.split(' ')
    let displayedWords = []

    function showNextWord() {
        if (displayedWords.length >= words.length) {
            console.log('finished typewriting!')
            return
        }

        const nextWord = words[displayedWords.length]

        displayedWords = [...displayedWords, nextWord]

        setTimeout(() => {
            showNextWord()
        }, nextWord.endsWith(';') || nextWord.endsWith('?') ? 650 : 125)
    }

    onMount(() => {
        setTimeout(() => {
            console.log('starting typewriter...')
            showNextWord()
        }, 500)
    })
</script>

<div class="typewriter" out:fade>
    {#each displayedWords as word}
        <span in:fade={{duration: 250, easing: expoOut}}>{word}</span>
    {/each}
</div>

<style>
    .typewriter {
        width: 100%;

        color: #eee;
        font-family: 'Outfit', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;

        display: flex;
        flex-flow: wrap;
    }

    .typewriter > span {
        margin-right: 4pt;
    }

    @media screen and (min-width: 640px) {
        .typewriter {
            font-size: 6rem;
        }

        .typewriter > span {
            margin-right: 14pt;
        }
    }
</style>