<template>
  <div class="archive">
    <app-header></app-header>
    <section class="category wrap">
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";
export default {
  data() {
    return {};
  },
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global";
</style>
