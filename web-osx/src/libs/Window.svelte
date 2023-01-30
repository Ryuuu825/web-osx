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
    export let stack: Stack<WindowState>;

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
            const allWindows = document.querySelectorAll(
                ".window"
            ) as NodeListOf<HTMLElement>;
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

    let resizeDirection: string = "";

    const handleWindowSizeChange = (
        direction:
            | "top"
            | "bottom"
            | "left"
            | "right"
            | "top-left"
            | "top-right"
            | "bottom-left"
            | "bottom-right"
    ) => {
        resizeDirection = direction;
        document.addEventListener("mousemove", resize);
    };

    const resize = (ev: MouseEvent) => {
        ev.preventDefault();
        if (resizeDirection === "top") {
            windowState.height += windowState.y - ev.clientY;
            windowState.y = ev.clientY;
        } else if (resizeDirection === "bottom") {
            windowState.height = ev.clientY - windowState.y;
        } else if (resizeDirection === "left") {
            windowState.width += windowState.x - ev.clientX;
            windowState.x = ev.clientX;
        } else if (resizeDirection === "right") {
            windowState.width = ev.clientX - windowState.x;
        } else if (resizeDirection === "top-left") {
            windowState.height += windowState.y - ev.clientY;
            windowState.y = ev.clientY;
            windowState.width += windowState.x - ev.clientX;
            windowState.x = ev.clientX;
        } else if (resizeDirection === "top-right") {
            windowState.height += windowState.y - ev.clientY;
            windowState.y = ev.clientY;
            windowState.width = ev.clientX - windowState.x;
        } else if (resizeDirection === "bottom-left") {
            windowState.height = ev.clientY - windowState.y;
            windowState.width += windowState.x - ev.clientX;
            windowState.x = ev.clientX;
        } else if (resizeDirection === "bottom-right") {
            windowState.height = ev.clientY - windowState.y;
            windowState.width = ev.clientX - windowState.x;
        }
    };
</script>

<div
    class="window fixed rounded-xl overflow-hidden shadow-lg w-fit h-fit border border-gray-500"
    bind:this={_window}
    style={windowState.getStyleString()}
    data-zIndex={windowState._zIndex || "1"}
    on:mousedown={function (ev) {
        handleWindowClick();
    }}
>
    <div class="window-resize">
        <div
            class="window-resize-handle absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
        />
        <div
            class="window-resize-handle absolute bottom-0 left-0 w-0.5 h-0.5 rounded-full  cursor-sw-resize"
        />
        <div
            class="window-resize-handle absolute top-0 right-0 w-0.5 h-0.5 rounded-full  cursor-ne-resize "
        />
        <div
            class="window-resize-handle absolute top-0 left-0 w-0.5 h-0.5 rounded-full cursor-nw-resize "
        />

        <div
            class="window-resize-handle absolute bottom-0 left-0 w-full h-0.5 cursor-s-resize "
            on:mousedown={function (ev) {
                handleWindowSizeChange("bottom");
                document.onmouseup = function (ev) {
                    document.removeEventListener("mousemove", resize);
                };
            }}
        />

        <div
            class="window-resize-handle absolute top-0 w-full h-0.5 cursor-n-resize "
        />
        <div
            class="window-resize-handle absolute left-0 w-0.5 h-full cursor-w-resize"
        />
        <div
            class="window-resize-handle absolute right-0 w-0.5 h-full cursor-e-resize"
        />
    </div>

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
    <div class="w-full h-full overflow-hidden">
        {#if frameElement}
            <svelte:component this={frameElement} {...pros} />
        {/if}
    </div>
</div>

<style>
    :global(.window) {
        background-color: #212529;
    }
</style>
