<!--
 
/**
 * @author
 * @file snackbar.vue
 * @fileBase snackbar
 * @path packages\vue2-components\lib\components\snackbar.vue
 * @from 
 * @desc 
 * @todo
 * 
 *
 * @done
 * @example
 */

-->

<template>
  <v-snackbar v-model="open" :bottom="bottom" :color="color" :timeout="2000">
    {{ msg }}
  </v-snackbar>
</template>

<script>
export default {
  // 组件名
  name: "snackbar",
  components: {},
  // filters:{},
  // mixins:[],
  props: {
    color: {
      type: String,
      // default: ()=> '',
      // required: true,
      // validator() { return  }
    },
    open: {
      type: Boolean,
    },
    msg: {
      type: String,
    },
    bottom: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  // 组件方法
  // computed:{},
  // watch:{},
  // created(){},
  methods: {
    info(msg = "") {
      this.color = "green";
      this.msg = msg;
      this.open = true;
    },
    success(msg) {
      this.color = "rgb(76,175,80)";
      this.msg = msg;
      this.open = true;
    },

    warning(msg) {
      this.color = "rgb(255, 170, 0)";
      this.msg = msg;
      this.open = true;
    },
    error(msg) {
      this.color = "rgb(255,82,82)";
      this.msg = msg;
      this.open = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
