<template>
  <div class="flex flex-col items-center">
    <section id="title">
      <h1 class="font-berkshire text-4xl">Text to Image tool</h1>
    </section>
    <section id="description">
      <p class="font-berkshire text-red-800">
        Tool to convert your text to an image with specified parameters.
      </p>
    </section>
    <div class="flex flex-wrap justify-center mt-8">
      <section>
        <Canvas class="mr-4 mb-4" :encoded-text-info-array="encodedTextInfoArray" />
      </section>
      <section>
        <TextInfo v-for="textInfo in textInfoArray" :id="textInfo.id" :key="textInfo.id" class="mb-4" 
                  @change="handleChange" @close="handleClose" />
        <button class="border-1 border-red-100 p-2 px-4 mb-4 bg-red-400" @click="addText">Add Text</button>
      </section>
    </div>
  </div>
</template>

<script>
import { TextInfoModel } from "../../components/TextInfo";
let textInfoId = 0;
export default {
  data() {
    return {
      textInfoArray: [new TextInfoModel()],
      encodedTextInfoArray: ''
    }
  },
  created() {
    this.encodedTextInfoArray = encodeURIComponent(
      JSON.stringify(this.textInfoArray)
    );
  },
  methods: {
    /** Receives the change event from text info
     * @param {TextInfoModel} textInfo
     */
    handleChange(id, textInfo) {
      for (const ti of this.textInfoArray) {
        if (ti.id === id) {
          Object.assign(ti, textInfo);
        }
      }
      this.encodedTextInfoArray = encodeURIComponent(
        JSON.stringify(this.textInfoArray)
      );
    },
    handleClose(id) {
      for (const ti of this.textInfoArray) {
        if (ti.id === id) {
          const idxToRemove = this.textInfoArray.indexOf(ti);
          this.textInfoArray.splice(idxToRemove, 1);
        }
      }
      this.encodedTextInfoArray = encodeURIComponent(
        JSON.stringify(this.textInfoArray)
      );
    },
    addText() {
      const ti = new TextInfoModel();
      ti.id = ++textInfoId;
      this.textInfoArray.push(ti);
    }
  },
}
</script>
