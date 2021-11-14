<template>
  <div
    class="flex items-center justify-items-center justify-center align-middle"
  >
    <div
      class="
        border-gray-300 border
        rounded-lg
        py-3
        px-4
        flex flex-col
        shadow-outer
        w-full
      "
    >
      <span class="font-bold text-lg text-left mb-1">{{ history.query }}</span>
      <div class="flex flex-row  text-left">
        <div class="flex-1">
          <div class="pb-2 text-gray-500 font-semibold">Hackermans</div>
          <ul class="">
            <li v-for="item in history.hints" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="flex-1 pl-3">
          <div class="pb-2 text-gray-500 font-semibold">Wildberries</div>
          <ul class=" ">
            <li v-for="item in wbResults" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    history: Object,
  },
  inject: ["$api"],
  data() {
    return {
      wbResults: [],
    };
  },
  async mounted() {
    let res = await this.$api.search.searchWb(this.history.query);
    let data = await res.json();
    let wbData = data.map((item) => item.name); //.slice(0, 5)
    this.wbResults = wbData;
    return;
  },
};
</script>

<style>
</style>