import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import store from "./plugins/vuex.js";
import "./plugins/md5.js";
import { registerServiceWorker } from "./registerServiceWorker";
import noCover from "./assets/imgs/noCover.jpeg";
import VueLazyload from "vue-lazyload";
registerServiceWorker();

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  observer: true
});

Vue.mixin({
  computed: {
    api() {
      return this.$store.getters.api;
    },
    isWebApp() {
      return window.navigator.standalone;
    }
  },
  methods: {
    getCover(coverUrl, normal) {
      if (
        coverUrl &&
        (coverUrl.startsWith("http://") ||
          coverUrl.startsWith("https://") ||
          coverUrl.startsWith("//"))
      ) {
        return normal
          ? this.api + "/cover?path=" + coverUrl
          : {
              src: this.api + "/cover?path=" + coverUrl,
              error: noCover
            };
      }
      return noCover;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
