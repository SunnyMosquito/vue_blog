<template>
  <div class="home">
    <app-header></app-header>
    <article>
      <h1>这是文章内容{{$route.params.categoryName}}</h1>
    </article>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";
export default {
  name: "category",
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/style/global";
h1 {
  font-size: px2rem(75);
}
</style>
