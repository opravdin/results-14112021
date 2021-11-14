<template>
  <div
    class="
      display-flex
      flex-col
      mt-10
      space-y-2
      justify-center
      align-middle
      px-6
    "
  >
    <div class="text-lg font-bold">Подсказочки</div>
    <div
      class="flex items-center justify-items-center justify-center align-middle"
    >
      <div
        class="
          border-gray-300 border
          rounded-full
          h-10
          pl-2
          pr-4
          flex flex-row
          space-x-1
          shadow-outer
          w-full
        "
      >
        <img class="py-2" alt="Vue logo" src="../assets/search.svg" />
        <input
          type="text"
          v-model="query"
          class="flex-grow outline-none border-0 font-bold"
          placeholder=""
          @input="updateFetchTimer"
          @keyup.enter="pushHistory"
        />
      </div>
    </div>
    <search-hints v-if="hints.length > 0" :hints="hints" :query="queryHinted" @suggestion="fromSuggest">
    </search-hints>
    <div class="text-left text-gray-400 italic flex flex-row space-x-2">
      <div>Например:</div>
      <div
        v-for="sample in samples.slice(0, 4)"
        :key="sample"
        class="border px-1 rounded cursor-pointer"
        @click="fromSuggest(sample)"
      >
        {{ sample }}
      </div>
      <div>или <span class="font-medium cursor-pointer" @click="showAllTests()">все сразу</span></div>
    </div>
    <div class="flex flex-col pt-5 space-y-4" v-if="history.length > 0">
      <div class="text-gray-600">Вы уже искали</div>
      <search-history
        v-for="item in historyReverse"
        :key="item.query"
        :history="item"
      >
      </search-history>
    </div>
  </div>
</template>

<script>
import SearchHints from "./SearchHints.vue";
import SearchHistory from "./SearchHistory.vue";
import samples from "../lib/tags"

export default {
  name: "Search",
  inject: ["$api"],
  components: {
    SearchHints,
    SearchHistory,
  },
  data() {
    return {
      searchTimer: null,
      query: "",
      queryHinted: "",
      hints: [],
      history: [],
      samples: samples,
    };
  },
  computed: {
    historyReverse() {
      return this.history.slice().reverse();
    },
  },
  methods: {
    updateFetchTimer() {
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
      }
      this.searchTimer = setTimeout(() => {
        this.querySearch();
      }, 500);
    },
    async querySearch() {
      if (this.query.length === 0) {
        this.hints = [];
        return;
      }
      let q = this.query;
      let res = await this.$api.search.query(q);
      let data = await res.json();
      console.log(data);
      this.hints = data;
      this.queryHinted = q;
      return;
    },
    async fromSuggest(text) {
      this.query = text
      this.pushHistory()
    },
    async pushHistory() {
      clearTimeout(this.searchTimer);
      await this.querySearch();
      this.history.push({
        query: this.query,
        hints: [...this.hints],
      });
      this.query = "";
      this.hints = [];
    },
    async showAllTests() {
      let i = 0, timer = null;
      let handler = () => {
        if (i >= this.samples.length) {
          clearInterval(timer)
          return
        }
        i+=1
        this.query = this.samples[i]
        this.pushHistory()
      }
      handler()
      setInterval(handler, 500)
      return
    }
  },
};
</script>

<style scoped>
.search-column {
  width: 500px;
  max-width: 100%;
}
</style>
