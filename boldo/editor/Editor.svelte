<script>
  import Device from "./Device.svelte";
  import Canvas from "./Canvas.svelte";
</script>

<style>
  .container {
    background-color: #f5f5f5;
    height: 100vh;
    width: 100vw;
  }
</style>

<main>
  <div class="container">
    <Device size={{ width: 375, height: 667 }} zoom={1}>
      <Canvas />
    </Device>
  </div>
</main>
