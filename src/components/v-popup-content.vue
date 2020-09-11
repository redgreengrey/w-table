<template>
  <div>
    <div :key="item.id" class="v-popup__content" v-for="item in data.address">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup-content",
  props: {
    data: Object
  }
};
</script>

<style scoped>
.v-popup__content {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  color: white;
}
</style>
