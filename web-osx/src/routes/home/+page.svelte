<script lang="ts">
    export const prerender = true;
    import "../../app.css";

    import { base } from "$app/paths";

</script>

<div class="h-screen w-screen select-none">
    <div
        class="-z-[100] fixed top-0 left-0 w-full h-full"
        style="background-image: url('{base}/bg.png'); background-size: cover; background-position: center; height: 100vh; width: 100vw;"
    />
</div>
