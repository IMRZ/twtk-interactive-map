import Vue from "vue";
import "./registerServiceWorker";
import VueCompositionApi from "@vue/composition-api";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

// load after VueCompositionApi
const App = require("./App.vue").default;

new Vue({
  render: h => h(App),
}).$mount("#app");
