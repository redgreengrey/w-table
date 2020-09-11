<template>
  <div class="v-pagination">
    <div class="v-pagination__data-status">
      {{ 1 + currentPage * size }} -
      {{
        this.currentPage + 1 === pageCount ? total : (1 + currentPage) * size
      }}
      из
      {{ total }}
    </div>
    <div class="v-pagination__buttons">
      <button
        :disabled="currentPage === 0"
        @click="firstPage"
        class="table-btn"
      >
        first
      </button>
      <button :disabled="currentPage === 0" @click="prevPage" class="table-btn">
        Previous
      </button>
      <button
        :disabled="currentPage === pageCount - 1"
        @click="nextPage"
        class="table-btn"
      >
        Next
      </button>
      <button
        :disabled="currentPage === pageCount - 1"
        @click="lastPage"
        class="table-btn"
      >
        last
      </button>
    </div>
    <div class="v-pagination__page-status">
      страница № {{ this.currentPage + 1 }} из
      {{ pageCount === 0 ? 1 : pageCount }}
    </div>
  </div>
</template>

<script>
export default {
  name: "v-pagination",
  props: {
    total: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      default: 20
    },
    searchMethod: Function
  },
  data() {
    return {
      currentPage: 0
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.size);
    }
  },
  methods: {
    nextPage() {
      this.currentPage++;
      this.searchMethod(this.currentPage, this.size);
    },
    prevPage() {
      this.currentPage--;
      this.searchMethod(this.currentPage, this.size);
    },
    firstPage() {
      this.currentPage = 0;
      this.searchMethod(this.currentPage, this.size);
    },
    lastPage() {
      this.currentPage = Math.ceil(this.total / this.size) - 1;
      this.searchMethod(this.currentPage, this.size);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-pagination {
  display: flex;
  flex-direction: column;

  &__data-status,
  &__buttons,
  &__page-status {
    margin-bottom: 10px;
  }
}
</style>
