<script>
  export let size;
  // export let zoom;
</script>

<style>
  .device {
    position: fixed;
    /*overflow: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    overflow: hidden;
  }
  .mockup {
    position: fixed;
    /*overflow: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
</style>

<div class="device" style="width:{size.width}px; height: {size.height}px">
  <slot />
</div>
<img
  alt="mock"
  class="mockup"
  src="/assets/iphone7.png"
  style="width:495px; height: 972px" />
