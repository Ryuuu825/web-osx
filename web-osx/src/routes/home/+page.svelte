<script lang="ts">
    export const prerender = true;
    import "../../app.css";
    import { base } from "$app/paths";


    import Window from "../../libs/Window.svelte";
    import { WindowState } from "../../libs/WindowState";
    import Stack from "../../libs/Stack";
    import github from "../../libs/apps/github.svelte";

    let test_window_state = new WindowState(720, 480, 600,300, 1 , "normal", "Testing"  );
    let test_window2_state = new WindowState(720, 480, 300,100, 2 , "normal", "Testing"  );
    let test_window3_state = new WindowState(720, 480, 100,100, 3 , "normal", "Testing"  );

    let stack = new Stack<WindowState>();
    stack.push(test_window_state);
    stack.push(test_window2_state);
    stack.push(test_window3_state);

</script>

<div class="h-screen w-screen select-none overflow-hidden">
    <div
        class="-z-[100] fixed top-0 left-0 w-full h-full"
        style="background-image: url('{base}/bg.png'); background-size: cover; background-position: center; height: 100vh; width: 100vw;"
    />
    <div>

        <Window
            windowState={test_window_state}
            frameElement={github}
            stack={stack}
            pros={{
                width: test_window_state.width,
                height: test_window_state.height,
            }}
        />

        <Window
            windowState={test_window2_state}
            frameElement={null}
            stack={stack}
        />

        <Window
            windowState={test_window3_state}
            frameElement={null}
            stack={stack}
        />
    </div>
</div>
