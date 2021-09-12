<template>
  <div class="flex flex-col items-center">
    <section id="title">
      <h1 class="font-berkshire text-4xl">Text to Image tool</h1>
    </section>
    <section id="description">
      <p class="font-berkshire">
        Tool to convert your text to an image with specified parameters.
      </p>
    </section>
    <div class="flex flex-wrap justify-center mt-8">
      <section>
        <Canvas class="mr-4 mb-4" />
      </section>
      <section>
        <TextInfo @change="handleChange" />
      </section>
    </div>
  </div>
</template>

<script>
import { TextInfoModel } from '~/components/TextInfo'
class CanvasInfo {
  height = 200
  width = 500
}
export default {
  data() {
    const ci = new CanvasInfo()
    const ti = new TextInfoModel()
    return {
      canvasInfo: ci,
      textInfo: ti,
      encodedTextInfoArray: '',
    }
  },
  computed: {
  },
  methods: {
    /** Receives the change event from text info
     * @param {TextInfoModel} textInfo
     */
    handleChange(textInfo) {
      if (!textInfo) textInfo = this.textInfo
      this.textInfo = textInfo
      this.encodedTextInfoArray = encodeURIComponent(
        JSON.stringify([this.textInfo])
      )
    },

    handleKeyup() {
      this.handleChange()
    },
  },
}
</script>
