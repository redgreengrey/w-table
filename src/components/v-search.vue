<template>
  <div class="v-search">
    <label for="">
      <input @input="input" type="text" :value="value" class="v-search-input" />
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
    }
  }
};
</script>

<style lang="scss" scoped>
.v-search {
  &-input {
    border: none;
    border-bottom: 1px solid;
    outline: none;
    background-color: #ececec;
    height: 25px;
  }
}
</style>
