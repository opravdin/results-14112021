<template>
  <div
    class="flex items-center justify-items-center justify-center align-middle"
  >
    <div
      class="
        border-gray-300 border
        rounded-lg
        p-3
        flex flex-row
        space-x-1
        shadow-outer
        w-full
      "
    >
      <ul>
        <li
          v-for="(item, index) in hintsHighlighted"
          :key="item"
          @click="suggest(index)"
          class="cursor-pointer"
        >
          <span v-html="item"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hints: Array,
    query: String,
  },
  methods: {
    suggest(index) {
      this.$emit("suggestion", this.hints[index]);
    },
  },
  computed: {
    hintsHighlighted() {
      return this.hints.map((hint) => {
        return hint.replace(
          this.query,
          `<span class="query-part">${this.query}</span>`
        );
      });
    },
  },
};
</script>

<style>
.query-part {
  font-weight: 700;
}
</style>