<template>
  <div class="flex flex-col items-center text-sm">
    <section id="title">
      <h1 class="font-courgette text-4xl">JSON Editor</h1>
    </section>
    <section id="description">
      <p class="font-berkshire text-red-800">
        JSON formatter to enable easier viewing and basic editing.
      </p>
    </section>
    <div class="flex flex-wrap mt-8 space-x-4">
      <section>
        <textarea ref="textArea" v-model="value" cols="100" rows="22"
                  class="border-2 border-red-500 p-2 text-sm"
                   @keyup="textUpdated"></textarea>
      </section>
      <section class="text-xl font-ubuntu font-bold text-center">
        <div>
          {{statusMessage}}
        </div>
        <div v-if="isArray">
          Array element count: {{arrayCount}}
        </div>
        <div class="border-2 border-green-900 p-2 my-2 flex flex-col space-y-2">
          <button class="rounded-sm bg-red-200 hover:bg-red-600 hover:text-white p-2 rounded font-courgette"
                  @click="undo">Undo last change</button>
          <button class="rounded-sm bg-red-200 hover:bg-red-600 hover:text-white p-2 rounded font-courgette"
                  @click="indentJson">Indent JSON</button>
          <button class="rounded-sm bg-red-200 hover:bg-red-600 hover:text-white p-2 rounded font-courgette"
                  @click="filterJson">Filter JSON fields</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "[{\"message\":\"Hello World\"},{\"message\":\"How are you.\"}]",
      statusMessage: '',
      lastValue: '',
      isArray: false,
      arrayCount: 0,
    }
  },
  created() {
    this.textUpdated();
    this.lastValue = this.value;
  },
  methods: {
    textUpdated() {
      this.isArray = false;
      try {
        const parsedJson = JSON.parse(this.value);
        this.statusMessage = "Valid JSON"
        this.isArray = Array.isArray(parsedJson);
        if (this.isArray) {
          this.arrayCount = parsedJson.length;
        }
      } catch(e) {
        this.statusMessage = "Invalid JSON"
      }
    },
    undo() {
      this.value = this.lastValue;
      this.textUpdated();
    },
    indentJson() {
      try {
        const parsedValue = JSON.parse(this.value);
        this.lastValue = this.value;
        this.value = JSON.stringify(parsedValue, null, 4);
      } catch (e) {
      }
    },
    filterJson() {
      try {
        const parsedValue = JSON.parse(this.value);
        const filterField = prompt('Please specify field name to filter');
        this.lastValue = this.value;
        this.value = JSON.stringify(parsedValue, [filterField], 4);
      } catch (e) {
      }
    },
  },
}
</script>