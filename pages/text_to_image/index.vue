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
          <input v-model="canvasInfo.width" placeholder="Canvas Width" class="p-2 border-2 border-red-400" @keyup="handleKeyup">
        </div>
        <div class="flex flex-col">
          <label class="font-berkshire">Canvas Height</label>
          <input v-model="canvasInfo.height" placeholder="Canvas Height" class="p-2 border-2 border-red-400" @keyup="handleKeyup">
        </div>
      </div>
    </section>
    <section class="mt-2">
      <TextInfo @change="handleChange" />
    </section>
    <iframe class="mt-8" :src="iframeSrc" :height="iframeHeight" :width="iframeWidth" />
  </div>
</template>

<script>
import { TextInfoModel } from '~/components/TextInfo';
class CanvasInfo {
  height = 200;
  width = 500;
}
export default {
  data() {
    const ci = new CanvasInfo();
    const ti = new TextInfoModel();
    return {
      canvasInfo: ci,
      textInfo: ti,
      encodedCanvasInfo: '',
      encodedTextInfo: '',
    }
  },
  computed: {
    iframeHeight() {
      return parseInt(this.canvasInfo.height) + 30;
    },
    iframeWidth() {
      return parseInt(this.canvasInfo.width) + 30;
    },
    iframeSrc() {
      return `/iframes/text_to_image?ci=${this.encodedCanvasInfo}&ti=${this.encodedTextInfo}`;
    } 
  },
  methods: {
    /** Receives the change event from text info
     * @param {TextInfoModel} textInfo
     */
    handleChange(textInfo) {
      if (!textInfo) textInfo = this.textInfo;
      this.textInfo = textInfo;
      this.encodedCanvasInfo = encodeURIComponent(JSON.stringify(this.canvasInfo));
      this.encodedTextInfo = encodeURIComponent(JSON.stringify(this.textInfo));
    },

    handleKeyup() {
      this.handleChange();
    }
  }
}
</script>
