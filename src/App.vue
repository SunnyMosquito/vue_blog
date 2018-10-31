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
  </div>
</template>

<script>
export default {
  name: "app",
  watch: {
    $route: function(to, from) {
      console.log("from:" + from.path + " to:" + to.path);
      // 我这里还是用了Vuex，不过应该不影响理解
      // this.$store.dispatch(
      //   "updateActiveTemplateId",
      //   this.$route.params.templateId
      // );
      // 通过更新Vuex中的store的数据，让数据发生变化
      // this.getTemplateById();
    }
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const html = document.querySelector("html");
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + "px";
});
</script>

<style lang="scss">
@import "./assets/style/global";
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
