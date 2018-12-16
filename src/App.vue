<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <go-top/>
  </div>
</template>

<script>
import GoTop from "@/components/GoTop.vue";
export default {
  name: "app",
  components: {
    GoTop
  }
};
document.addEventListener("DOMContentLoaded", () => {
  // 加载时更改px，用于rem布局
  const html = document.querySelector("html");
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + "px";
});
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
