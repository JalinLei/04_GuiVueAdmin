import cronPlugs from "./index.vue";
import './index.scss'

const install = function (Vue) {
  Vue.component(cronPlugs.name, cronPlugs);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { cronPlugs }
export default {
  install
};
