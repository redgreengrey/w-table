<template>
  <div class="v-search">
    <label for="">
      <input
        @input="input"
        @keyup.enter="searchBtnClicked"
        type="text"
        :value="value"
        class="v-search__input"
      />
      <button @click="searchBtnClicked" class="v-search__button table-btn">Найти</button>
    </label>
  </div>
</template>

<script>
export default {
  name: "v-search",
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  },
  methods: {
    input(event) {
      let value = event.target.value;
      this.$emit("input", value);
    },
    searchBtnClicked() {
      this.$emit("searchBtnClicked", this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-search {
  &__input {
    border: none;
    border-bottom: 1px solid;
    outline: none;
    background-color: #ececec;
    height: 25px;
  }
  &__button {
    margin-left: 10px;
  }
}
</style>
