import Vuetify from "vuetify";
import Vue from "vue";
import Snackbar from "./Snackbar.vue";

Vue.use(Vuetify);
const v = new Vue({
  render(createElement) {
    return createElement(Snackbar);
  },
  vuetify: new Vuetify(),
});

v.$mount();
// 直接推到body上去
document.body.appendChild(v.$el);
const snackbar: any = v.$children[0];
function info(msg: any) {
  snackbar.info(msg);
}

function error(msg: any) {
  snackbar.error(msg);
}

function warning(msg: any) {
  snackbar.warning(msg);
}

function success(msg: any) {
  snackbar.success(msg);
}

export default {
  info,
  success,
  warning,
  error,
};
