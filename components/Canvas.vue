<template>
  <div class="flex-col border-2 border-red-200 p-2">
    <div class="flex justify-center">
      <div class="flex flex-col mr-2">
        <label class="font-berkshire">Canvas Width</label>
        <input
          v-model="canvasInfo.width"
          placeholder="Canvas Width"
          class="p-2 border-2 border-red-400"
          @keyup="handleKeyup"
        />
      </div>
      <div class="flex flex-col">
        <label class="font-berkshire">Canvas Height</label>
        <input
          v-model="canvasInfo.height"
          placeholder="Canvas Height"
          class="p-2 border-2 border-red-400"
          @keyup="handleKeyup"
        />
      </div>
    </div>
    <iframe
      class="mt-8"
      :src="iframeSrc"
      :height="iframeHeight"
      :width="iframeWidth"
    />
  </div>
</template>

<script>
class CanvasInfo {
  height = 200
  width = 500
}
export default {
  data() {
    const ci = new CanvasInfo()
    return {
      canvasInfo: ci,
      encodedCanvasInfo: '',
      encodedTextInfoArray: '',
    }
  },
  computed: {
    iframeHeight() {
      return parseInt(this.canvasInfo.height) + 30
    },
    iframeWidth() {
      return parseInt(this.canvasInfo.width) + 30
    },
    iframeSrc() {
      return `/iframes/text_to_image?ci=${this.encodedCanvasInfo}&tia=${this.encodedTextInfoArray}`
    },
  },
  created() {
    this.encodedCanvasInfo = encodeURIComponent(JSON.stringify(this.canvasInfo))
  },
  methods: {
    handleKeyup() {},
  },
}
</script>