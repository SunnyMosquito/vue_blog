<template>
  <div class="about">
    <app-header></app-header>
      <div class="content wrap">
        <h5>没什么东西！</h5>
      </div>
    <app-footer></app-footer>
  </div>
  
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";

export default {
  name: "about",
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppFooter
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global";
</style>
