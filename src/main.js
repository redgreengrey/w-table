import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import "material-design-icons-iconfont";
import "./assets/styles/styles.scss";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
