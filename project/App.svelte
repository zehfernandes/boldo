<script>
  import { getContext } from "svelte";

  // You can call your design globals in any children.
  const { getDesign } = getContext("key");
  let fromFigma = getDesign();

  // You can overwrite figma values in runtime
</script>

<div
  style="height:100%;display:flex;align-items:center;justify-content:center;">
  Your app is ready
</div>
