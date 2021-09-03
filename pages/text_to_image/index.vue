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
          <label class="font-berkshire">Canvas Width</label>
          <input v-model="canvasWidth" placeholder="Canvas Width" class="p-2 border-2 border-red-400">
        </div>
        <div class="flex flex-col">
          <label class="font-berkshire">Canvas Height</label>
          <input v-model="canvasHeight" placeholder="Canvas Height" class="p-2 border-2 border-red-400">
        </div>
      </div>
    </section>
    <section class="mt-2">
      <div class="flex flex-col items-center">
        <label class="font-berkshire">Text</label>
        <input v-model="canvasText" placeholder="Text" size="60" class="p-2 border-2 border-red-400 text-center">
      </div>
    </section>
    <section class="mt-2">
      <div class="flex">
        <div class="flex flex-col mr-2">
          <label class="font-berkshire">Text Left Position</label>
          <input v-model="canvasTextPosLeft" placeholder="Text Pos Left" class="p-2 border-2 border-red-400">
        </div>
        <div class="flex flex-col">
          <label class="font-berkshire">Text Top Position</label>
          <input v-model="canvasTextPosTop" placeholder="Text Pos Top" class="p-2 border-2 border-red-400">
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
      canvasText: 'Hello World',
      canvasTextPosLeft: 120,
      canvasTextPosTop: 80,
      canvasTextFont: '30px Arial',
    }
  },
  computed: {
    iframeHeight() {
      return parseInt(this.canvasHeight) + 30;
    },
    iframeWidth() {
      return parseInt(this.canvasWidth) + 30;
    },
    iframeSrc() {
      return `/iframes/text_to_image?` +
      `h=${this.canvasHeight}&w=${this.canvasWidth}&t=${this.canvasText}&` +
      `tt=${this.canvasTextPosTop}&tl=${this.canvasTextPosLeft}&tf=${this.canvasTextFont}`;
    } 
  }
}
</script>
