<template>
  <div class="flex flex-col items-center text-sm">
    <section id="title">
      <h1 class="font-courgette text-4xl">HEX Editor</h1>
    </section>
    <section id="description">
      <p class="font-berkshire text-red-800">
        View and edit the binary content of a file as a sequence of Hex values
      </p>
    </section>
    <div class="flex flex-wrap mt-8 space-x-4">
      <section>
        <textarea ref="textArea" v-model="value" cols="150" rows="22"
                  class="border-2 border-red-500 p-2 text-sm"
                   @keyup="textUpdated"></textarea>
      </section>
      <section>
        <div class="border-2 border-red-900 p-2 text-xl font-ubuntu font-bold text-center">
          {{statusMessage}}
        </div>
        <div class="border-2 border-green-900 p-2 my-2 flex flex-col space-y-2">
          <button class="rounded-sm bg-red-200 hover:bg-red-600 hover:text-white p-2 rounded font-courgette"
                  @click="loadFile">Load File to view</button>
          <button class="rounded-sm bg-red-200 hover:bg-red-600 hover:text-white p-2 rounded font-courgette"
                  @click="toggle">Toggle text/hex view</button>

        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusMessage: 'No file loaded.',
      value: '',
      fileName: '',
      fileContentAsText: '',
      fileContentAsHex: ''
    }
  },
  created() {
    this.textUpdated();
    this.lastValue = this.value;
  },
  methods: {
    textUpdated() {
      this.lastValue = this.value;
    },
    async loadFile() {
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      this.fileContentAsText = await file.text();
      this.fileName = await file.name;
      this.fileContentAsHex = '';
      for (const c of this.fileContentAsText) {
        this.fileContentAsHex += `0x${c.charCodeAt(0).toString(16)} `;
      }
      this.value = this.fileContentAsHex;
      this.statusMessage = `Loaded ${this.fileName}`;
    },
    toggle() {
      if (this.value === this.fileContentAsText) {
        this.value = this.fileContentAsHex;
      } else {
        this.value = this.fileContentAsText;
      }
    }
  },
}
</script>