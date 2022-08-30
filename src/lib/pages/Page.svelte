<section>
    <div class="header">
        <slot name="header">
            <header>
                Erm, something doesn't seem right...
            </header>
        </slot>
    </div>
    <slot name="content">
        <div>
            This message shouldn't show, but if it does please contact Zeko about this somehow!
        </div>
    </slot>
</section>

<style global>
    .header {
        width: 100%;
        height: 3rem;
        padding: 0 1rem;

        display: flex;
        align-items: center;

        color: black;
        font-family: 'Inter', sans-serif;
        font-weight: 700;

        background-color: white;
    }
</style>
