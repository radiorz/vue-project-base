import { marqueePlugin } from "./lib/old/main";
Vue.use(marqueePlugin);
new Vue({
  template: `
  <div class="marquee-container" style="width:50px;">
    <div v-marquee="{ scrollDirection: 'left', scrollSpeed: 50 }">
      This is a marquee text that will scroll from right to left.
    </div>
  </div>
  `,
}).$mount("#app");
