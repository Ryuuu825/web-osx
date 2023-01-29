<!-- A Window object -->
<script lang="ts">
    import { onMount } from "svelte";

    import type { WindowState } from "./WindowState";
    import type Stack from "./Stack";

    export let windowState: WindowState;

    export let frameElement: ConstructorOfATypedSvelteComponent | null = null;
    export let pros: any = null;
    export let destroyFunction: () => void = () => {
        if (_window) {
            _window.remove();
        }
    };
    export let stack : Stack<WindowState>;


    let _window: HTMLElement; // reference to the window element, can be accessed from outside
    let offsetX = 0;
    let offsetY = 0;


    function grab(clientX: number, clientY: number) {
        if (_window) {
            offsetX = clientX - _window.offsetLeft;
            offsetY = clientY - _window.offsetTop;
            document.addEventListener("mousemove", drag);

            handleWindowClick();
            // restore all the windows to their previous z index
            const allWindows = document.querySelectorAll(".window") as NodeListOf<HTMLElement>;
            allWindows.forEach((window) => {
                window.style.zIndex = window.dataset.zindex as string;
            });
        }
    }

    function drag(ev: MouseEvent) {
        if (_window) {
            ev.preventDefault();
            windowState.x = ev.clientX - offsetX;
            windowState.y = ev.clientY - offsetY;
        }
    }

    const resetZIndex = function (ev: MouseEvent) {
        if (
            ev.target !== _window &&
            ev.target instanceof HTMLElement &&
            ev.target.classList.contains("window")
        ) {
            // set the z index based on the stack
            windowState.zIndex = stack.getIndexOf(windowState) + 1;
        }
    };

    const handleWindowClick = function () {
        // if the event is null, set the z index to 999
        windowState.zIndex = 999;
        document.addEventListener("click", resetZIndex);

        // move the window to the top of the stack
        stack.moveToTop(windowState);
    };

    onMount(async() => {
        _window?.setAttribute("data-zIndex", windowState.zIndex.toString());
    });
</script>

<div
    class="window fixed rounded-xl overflow-hidden shadow-lg w-fit h-fit border border-gray-500"
    bind:this={_window}
    style={windowState.getStyleString()}
    data-zIndex={windowState._zIndex || '1' }
    on:mousedown={function (ev) {
        ev.stopPropagation();
        handleWindowClick();
    }}
>
    <div
        class="window-header text-gray-100 p-2 flex flex-row"
        on:mousedown={function (ev) {
            ev.stopPropagation();
            grab(ev.clientX, ev.clientY);
        }}
        on:mouseup={function (ev) {
            ev.stopPropagation();
            document.removeEventListener("mousemove", drag);
        }}
    >
        <div class="">
            <button
                class="w-3 h-3 bg-red-500 rounded-full"
                on:click={function (ev) {
                    ev.stopPropagation();
                    destroyFunction();
                }}
            />
            <button
                class="w-3 h-3 bg-yellow-500 rounded-full"
                on:click={function (ev) {
                    ev.stopPropagation();
                    windowState.state = "minimized";
                    _window?.classList.add("hidden");
                }}
            />
            <button
                class="w-3 h-3 bg-green-500 rounded-full"
                on:click={function (ev) {
                    ev.stopPropagation();
                    if (windowState.state === "maximized") {
                        windowState.state = "normal";
                        windowState.width = windowState._width;
                        windowState.height = windowState._height;
                        windowState.x = windowState._x;
                        windowState.y = windowState._y;
                    } else {
                        windowState.state = "maximized";
                        windowState._width = windowState.width;
                        windowState._height = windowState.height;
                        windowState._x = windowState.x;
                        windowState._y = windowState.y;
                        windowState.width = window.innerWidth;
                        windowState.height = window.innerHeight;
                        windowState.x = 0;
                        windowState.y = 0;
                    }
                }}
            />
        </div>
        <div class="window-title mx-auto">
            {windowState.windowName}
        </div>
    </div>
    <div>
        {#if frameElement}
            <svelte:component this={frameElement} {...pros} />
        {/if}
    </div>
</div>

<style>
    :global(.window) {
        background-color: #212529;
        transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
    }
</style>
