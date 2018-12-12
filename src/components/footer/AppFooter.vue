<template>
  <footer class="footer">
    <a href="http://www.miitbeian.gov.cn">互联网ICP备案：粤ICP备18061554号</a>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global";
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: px2rem(14);
  background-color: $bgColor;
  padding: px2rem(15) 0;
  a {
    color: $linkColor;
  }
}
</style>

