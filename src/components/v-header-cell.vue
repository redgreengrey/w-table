<template>
  <div @click="sortBy(keyName)" class="v-header-cell">
    <div>
      <slot></slot>
    </div>
    <div>
      <div class="triangle" :class="sortIconStyle(keyName)"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keyName: String,
    sortBy: Function,
    sortIconStyle: Function
  }
};
</script>

<style lang="scss" scoped>
.v-header-cell {
  display: flex;
  justify-content: center;
  min-width: 160px;
  height: 20px;

  &:hover {
    .triangle {
      visibility: visible;
    }
  }
}

.triangle {
  border: 5px solid transparent;
  border-bottom: 8px solid;
  margin: 0px 0 0 10px;
  visibility: hidden;

  &.sorted {
    visibility: visible;

    &.desc {
      transform: rotate(180deg);
      margin: 5px 0 0 10px;
    }
  }
}
</style>
