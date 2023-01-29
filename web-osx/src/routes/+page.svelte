<script lang="ts">
    export const prerender = true;
    import "../app.css";

    import { base } from "$app/paths";

    let inputElement: HTMLInputElement;
    let inputGroupElement: HTMLDivElement;
    const PASSWORD = "password";

    $: onInput = false;

</script>

<div class="h-screen w-screen select-none"
    on:keydown={e => {
        if (e.key === "Enter") {
            if (inputElement.value === PASSWORD) {
                window.location.href = "/home";
            } else {
                inputElement.value = "";
                inputGroupElement.classList.add("animate-shake-horizontal")
                setTimeout(() => {
                    inputGroupElement.classList.remove("animate-shake-horizontal")
                }, 1000)
            }
        }
    }}
>
    <div
        class="-z-[100] fixed top-0 left-0 w-full h-full"
        style="background-image: url('{base}/bg.png'); background-size: cover; background-position: center; height: 100vh; width: 100vw;"
    />
    <div class="w-full h-full">
        <div class="flex flex-col items-center justify-center h-full">
            <div class="my-auto flex flex-col items-center justify-center ">
                <div
                    class="rounded-full w-32 h-32 p-3"
                    style="background-image: url('{base}/icon.png'); background-size: cover; background-position: center;"
                />
                <div class="mt-5 font-bold text-xl">Ryu</div>
                <div class="passwordinput mt-3 relative" bind:this={inputGroupElement}>
                    <input
                        type="password"
                        id="password"
                        bind:this={inputElement}
                        value="password"
                        class="w-[15rem] h-[1.5rem] rounded-lg bg-gray-400 opacity-80 px-3 ring-0 focus:ring-0 focus:outline-none"
                        on:focus={() => {
                            onInput = true;
                        }}
                        on:blur={() => {
                            onInput = inputElement.value.length > 0;
                        }}
                    />
                    <label
                        for="password"
                        class="absolute top-[0.3rem] left-3 text-gray-300 text-xs font-semibold block select-none"
                        class:hidden={
                            onInput || inputElement ? 
                            inputElement.value.length > 0
                                ? "hidden"
                                : ""
                            : "hidden"
                        }
                    >
                        Enter Password
                    </label>
                </div>
            </div>

            <div class="mb-3 flex flex-col justify-center items-center text-xs">
                <button
                    class="bg-gray-400 hover:bg-gray-500 text-white w-8 h-8 rounded-full mx-auto my-auto"
                    on:click={() => {
                        inputElement.value = "";
                        onInput = false;
                    }}
                >
                    <div class="border rounded-full w-fit px-1.5 p-0.5  mx-auto my-auto">
                        X
                    </div>
                </button>
                <div class="mt-1">
                    Cancel
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    :global(html) {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
        color: hsla(0, 0%, 100%, 0.85);
    }
</style>
