<template>
  <div class="flex flex-col items-center">
    <section class="mt-2">
      <div class="flex flex-col items-center">
        <label class="font-berkshire">Text</label>
        <input
          v-model="text"
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
            v-model="textFontSize"
            placeholder="Text Font Size"
            class="p-2 border-2 border-red-400"
            @keyup="handleChange"
          />
        </div>
        <div class="flex flex-col">
          <label class="font-berkshire">Text Font Family</label>
          <select
            v-model="textFontFamily"
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
            v-model="textPosLeft"
            placeholder="Text Pos Left"
            class="p-2 border-2 border-red-400"
            @keyup="handleChange"
          />
        </div>
        <div class="flex flex-col">
          <label class="font-berkshire">Text Top Position</label>
          <input
            v-model="textPosTop"
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
    textPosLeft = 175;
    textPosTop = 98;
}
export default {
  data() {
    return {
      text: 'Hello Worlddd',
      textPosLeft: 175,
      textPosTop: 98,
      textFontSize: 30,
      textFontFamily: 'Satisfy',
    }
  },
  computed: {
  },
  methods: {
    handleChange() {
        this.$emit('change', new TextInfoModel());
    }
  }
}
</script>
