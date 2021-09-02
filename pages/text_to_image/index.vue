<template>
  <div class="flex flex-col items-center">
    <section id="title">
      <h1 class="font-berkshire text-4xl">Text to Image tool</h1>
    </section>
    <section id="description">
      <p class="font-berkshire">Tool to convert your text to an image with specified parameters.</p>
    </section>
    <section class="mt-12">
      <div class="flex">
        <div class="flex flex-col mr-2">
          <label class="font-berkshire">Canvas Height</label>
          <input v-model="canvasHeight" placeholder="Canvas Height" name="canvasHeight" class="p-2 border-2 border-red-400">
        </div>
        <div class="flex flex-col">
          <label class="font-berkshire">Canvas Width</label>
          <input v-model="canvasWidth" placeholder="Canvas Width" class="p-2 border-2 border-red-400">
        </div>
      </div>
    </section>
    <iframe class="mt-8" :src="iframeSrc" :height="iframeHeight" :width="iframeWidth" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasHeight: 200,
      canvasWidth: 500,
    }
  },
  computed: {
    iframeHeight() {
      return this.canvasHeight + 30;
    },
    iframeWidth() {
      return this.canvasWidth + 30;
    },
    iframeSrc() {
      return `/iframes/text_to_image?h=${this.canvasHeight}&w=${this.canvasWidth}`;
    } 
  }
}
</script>
