<template>
  <div v-if="visible" class="popup-wrapper" ref="popupWrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <div><slot name="header"></slot></div>
        <div @click="closePopup" class="close_popup">
          <i class="material-icons">close</i>
        </div>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup",
  props: {
    popupName: String
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    showPopup() {
      this.visible = true;
    },
    closePopup() {
      this.visible = false;
    }
  },
  mounted() {
    document.addEventListener("click", item => {
      if (item.target === this.$refs["popupWrapper"]) {
        this.closePopup();
      }
    });
    document.body.addEventListener("keyup", e => {
      if (e.code === "Escape") {
        this.closePopup();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.popup-wrapper {
  background-color: rgba(25, 25, 25, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
}

.v-popup {
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: fixed;
  top: 30%;
  left: 38%;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  box-shadow: 0 0 15px 0 #000;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
}

.close_popup {
  color: #fff;
  cursor: pointer;
}
</style>
