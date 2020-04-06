<script>
  import anime from "animejs";
  import { generateStyle } from "../utils/generateStyle.js";

  // Props
  export let x = undefined;
  export let y = undefined;
  export let width = undefined;
  export let height = undefined;
  export let fontSize = undefined;
  export let fontFamily = undefined;
  export let backgroundColor = undefined;
  export let color = undefined;
  export let letterSpacing = undefined;
  export let lineHeight = undefined;
  export let text = undefined;
  export let onClick = undefined;

  // Functions
  export function animate(props) {
    anime({
      targets: domNode,
      ...props
    });
  }

  let domNode;
  let lines;
  $: {
    if (text) {
      lines = text.split("\n");
    }
  }
  // TODO: Check what the best method $$props vs prop object
  // prettier-ignore
  const props = { x, y, width, height, fontSize, fontFamily, backgroundColor, color, text, letterSpacing, lineHeight };
  let styles = generateStyle($$props);
</script>

<style>
  div {
    position: fixed;
  }
</style>

<div on:click={onClick} bind:this={domNode} style={styles}>
  <slot />

  {#if text}
    {#each lines as l, i}
      <span style="display:block;">{l}</span>
    {/each}
  {/if}
</div>
