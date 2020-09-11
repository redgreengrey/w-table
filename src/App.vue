<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" class="logo" />
    <div>
      <button v-if="!users.length > 0" @click="getData">
        Показать пользователей
      </button>
    </div>
    <v-spinner v-if="loaded" class="spinner" />
    <h4 v-if="isError">
      Не удалось загрузить данные. Попробуйте ещё.
    </h4>
    <v-table :users="users" :config="config" :size="10" />
  </div>
</template>

<script>
import { config } from "./plugins/columns";
import vTable from "./components/v-table.vue";
import vSpinner from "./components/v-spinner";

export default {
  data() {
    return {
      users: [],
      loading: false,
      error: null,
      config
    };
  },
  computed: {
    loaded() {
      return this.loading;
    },
    isError() {
      return this.error !== null;
    }
  },
  methods: {
    async getData() {
      this.loading = true;
      await this.$axios
        .get(
          "http://www.filltext.com/?rows=1000&id=%7Bindex%7D&fullname=%7BfirstName%7D~%7BlastName%7D&company=%7Bbusiness%7D&email=%7Bemail%7D&uname=%7Busername%7D&address=%7BaddressObject%7D"
        )
        .then(res => {
          this.users.push(...res.data);
        })
        .catch(error => {
          this.error = error;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  name: "App",
  components: {
    vTable,
    vSpinner
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Rubik");

#app {
  font-family: Rubik, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  min-width: 910px;
}

.logo {
  width: 100px;
  margin: 10px auto;
}

.spinner {
  margin: 0 auto;
}
</style>
