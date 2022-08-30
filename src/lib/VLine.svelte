<div class="display">
    <div class="pos">
        <div class="line">
        </div>
    </div>
</div>

<style>
    .display {
        display: none;
    }

    .pos{
        width: 1px;
        height: 100vh;

        position: absolute;
        top: 0;
    }

    .line {
        width: 1px;
        height: 100%;

        position: absolute;
        right: 1px;

        border-left-width: 1px;
        border-left-style: dashed;
        border-left-color: #ffffff2f;

        pointer-events: none;
    }

    @media screen and (min-width: 720px) {
        .display {
            display: block;
        }
    }
</style>