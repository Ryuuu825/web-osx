<script lang="ts">
    export let width : number;
    export let height : number;
</script>

<div class="w-full h-full z-0">
    <iframe
        width={width}
        height={height - 30}
        src="https://www.youtube.com/embed/J6eih31MaQ8"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    />
</div>
