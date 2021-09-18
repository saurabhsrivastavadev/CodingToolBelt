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
        <Canvas class="mr-4 mb-4" :encoded-text-info-array="encodedTextInfoArray" />
      </section>
      <section>
        <TextInfo :id="0" @change="handleChange" />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textInfo: null,
      encodedTextInfoArray: ''
    }
  },
  methods: {
    /** Receives the change event from text info
     * @param {TextInfoModel} textInfo
     */
    handleChange(id, textInfo) {
      this.textInfo = textInfo;
      this.encodedTextInfoArray = encodeURIComponent(
        JSON.stringify([this.textInfo])
      );
    },
  },
}
</script>
