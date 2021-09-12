<template>
  <div class="flex flex-col items-center bg-red-100 p-4 border-2 border-red-200">
    <section>
      <div class="flex flex-col items-center">
        <label class="font-berkshire">Text</label>
        <input
          v-model="textInfo.text"
          placeholder="Text"
          size="60"
          class="p-2 border-2 border-red-400 text-center"
          @keyup="handleChange"
        />
      </div>
    </section>
    <section class="mt-2">
      <div class="flex">
        <div class="flex flex-col mr-2">
          <label class="font-berkshire">Text Font Size</label>
          <input
            v-model="textInfo.fontSize"
            placeholder="Text Font Size"
            class="p-2 border-2 border-red-400"
            @keyup="handleChange"
          />
        </div>
        <div class="flex flex-col">
          <label class="font-berkshire">Text Font Family</label>
          <select
            v-model="textInfo.fontFamily"
            class="p-2 border-2 border-red-400 w-64"
            @change="handleChange"
          >
            <option value="Berkshire Swash">Berkshire Swash</option>
            <option value="Courgette">Courgette</option>
            <option value="Indie Flower">Indie Flower</option>
            <option value="Pacifico">Pacifico</option>
            <option value="Permanent Marker">Permanent Marker</option>
            <option value="Satisfy">Satisfy</option>
          </select>
        </div>
      </div>
    </section>
    <section class="mt-2">
      <div class="flex">
        <div class="flex flex-col mr-2">
          <label class="font-berkshire">Text Left Position</label>
          <input
            v-model="textInfo.posLeft"
            placeholder="Text Pos Left"
            class="p-2 border-2 border-red-400"
            @keyup="handleChange"
          />
        </div>
        <div class="flex flex-col">
          <label class="font-berkshire">Text Top Position</label>
          <input
            v-model="textInfo.posTop"
            placeholder="Text Pos Top"
            class="p-2 border-2 border-red-400"
            @keyup="handleChange"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export class TextInfoModel {
    text = 'Hello World';
    posLeft = 175;
    posTop = 98;
    fontSize = 30;
    fontFamily = 'Satisfy';
}
export default {
  data() {
    const ti = new TextInfoModel();
    return {
      textInfo: ti,
    }
  },
  computed: {
  },
  methods: {
    handleChange() {
        this.$emit('change', this.textInfo);
    }
  }
}
</script>
