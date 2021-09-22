<template>
  <div class="flex flex-col items-center">
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
        <textarea id="textArea" cols="150" rows="22" v-model="value" @keyup="textUpdated" class="border-2 border-red-500 p-2 text-sm"></textarea>
      </section>
      <section>
        <div class="border-2 border-red-900 p-2 text-sm">
          {{lineCount}} Lines <br/>
          {{wordCount}} Words <br/>
          {{charCount}} Characters
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "Hello World\nHow are you doing today?  ",
      lineCount: 0,
      wordCount: 0,
      charCount: 0,
    }
  },
  methods: {
    textUpdated() {
      this.lineCount = this.value.split(/\r\n|\r|\n/).length;
      this.wordCount = this.value.split(' ').length;
      this.charCount = this.value.length;
    }
  },
  created() {
    this.textUpdated();
  }
}
</script>