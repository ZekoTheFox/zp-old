<script lang="ts">
    import { page } from '$app/stores'
</script>

<svelte:head>
    <title>error {$page.status} - zeko.party</title>
</svelte:head>

<div class="page">
    {$page.status} | {$page.error.message}
</div>

<style>
    .page {
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>