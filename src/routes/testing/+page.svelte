<script lang="ts">
    import SettingsIcon from 'svelte-tabler/Settings.svelte'
    import ArrowLeftIcon from 'svelte-tabler/ArrowLeft.svelte'
</script>

<div id="settings" class="panel">
    <div class="title">
        <div class="hidden">
            <a href="#settings" class="icon">
                <SettingsIcon size="32"/>
            </a>
        </div>
        <div class="shown">
            <a href="#hide-settings" class="icon">
                <ArrowLeftIcon size="32"/>
            </a>
        </div>
        <header>
            Wow, iPhone
        </header>
    </div>
    <div>
        <button type="button">
            I'm a button
        </button>
    </div>
</div>

<style>
    .panel {
        height: 3rem;
        width: 3rem;

        overflow: clip;
        background-color: #201337;

        display: flex;
        flex-direction: column;

        transition: width 300ms ease, height 300ms ease;
    }

    .icon {
        width: 3rem;
        height: 3rem;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hidden {
        width: 3rem;
        height: 3rem;
    }

    #settings:target {
        width: 30rem;
        height: 20rem;
    }

    #settings:target .hidden {
        display: none;
    }

    #settings:not(:target) .shown {
        display: none;
    }

    #settings:has(:target :target-within) .shown {
        display: block;
    }

    .title {
        width: 30rem;

        display: flex;
        align-items: center;
    }

    .title > header {
        margin-left: 1rem;
        font-size: large;
        font-weight: 700;
    }
</style>