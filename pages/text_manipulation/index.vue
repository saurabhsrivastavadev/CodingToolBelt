<template>
  <div class="flex flex-col items-center text-sm">
    <section id="title">
      <h1 class="font-courgette text-4xl">Text Manipulation tool</h1>
    </section>
    <section id="description">
      <p class="font-berkshire text-red-800">
        Tool to manipulate some text from/to your clipboard.
      </p>
    </section>
    <div class="flex flex-wrap mt-8 space-x-4">
      <section>
        <textarea ref="textArea" v-model="value" cols="150" rows="22" 
                  class="border-2 border-red-500 p-2 text-sm"
                   @keyup="textUpdated"></textarea>
      </section>
      <section>
        <div class="border-2 border-red-900 p-2 text-xl font-satisfy">
          {{lineCount}} Lines <br/>
          {{wordCount}} Words <br/>
          {{charCount}} Characters
        </div>
        <div class="border-2 border-green-900 p-2 my-2 flex flex-col space-y-2">
          <button class="rounded-sm bg-red-200 hover:bg-red-600 hover:text-white p-2 rounded font-courgette"
                  @click="keepNth">Keep every Nth line</button>
          <button class="rounded-sm bg-red-200 hover:bg-red-600 hover:text-white p-2 rounded font-courgette"
                  @click="keepNonEmpty">Keep Non-empty lines</button>
          <button class="rounded-sm bg-red-200 hover:bg-red-600 hover:text-white p-2 rounded font-courgette"
                  @click="trimWhitespaces">Trim whitespaces</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "Hello World\nHow are you doing today?",
      lineCount: 0,
      wordCount: 0,
      charCount: 0,
    }
  },
  created() {
    this.textUpdated();
  },
  mounted() {
    // const textarea = this.$refs.textArea;
    // console.log('cursor position ' + textarea.selectionStart);
  },
  methods: {
    textUpdated() {
      this.lineCount = this.value.split(/\r\n|\r|\n/).filter(s => { return s.trim().length > 0}).length;
      this.wordCount = this.value.split(/[ \t\r\n]/).filter(s => { return s.trim().length > 0}).length;
      this.charCount = this.value.length;
    },
    keepNth() {
      const n = prompt('Keep every Nth line, please specify n', 1);
      const lines = this.value.split(/\r\n|\r|\n/);
      let updatedValue = '';
      let lineNumber = 1;
      for (const line of lines) {
        if (lineNumber % n === 0) {
          updatedValue += line;
          updatedValue += '\n';
        }
        lineNumber++;
      }
      this.value = updatedValue;
    },
    keepNonEmpty() {
      const lines = this.value.split(/\r\n|\r|\n/);
      let updatedValue = '';
      for (const line of lines) {
        if (line.trim().length > 0) {
          updatedValue += line;
          updatedValue += '\n';
        }
      }
      this.value = updatedValue;
    },
    trimWhitespaces() {
      const lines = this.value.split(/\r\n|\r|\n/);
      let updatedValue = '';
      for (const line of lines) {
        updatedValue += line.trim();
        updatedValue += '\n';
      }
      this.value = updatedValue;
    }
  },
}
</script>