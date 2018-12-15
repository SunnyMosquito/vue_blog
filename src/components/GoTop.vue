<template>
  <div class="go-top">
    <a @click="goTop" ref="btn" title="回到顶部"></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTop: true,
      timer: null
    };
  },
  mounted() {
    this.needScroll();
  },
  methods: {
    needScroll() {
      let clientHeight = document.documentElement.clientHeight;
      let obtn = this.$refs.btn;
      window.onscroll = function() {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (osTop >= clientHeight) {
          obtn.style.display = "block";
        } else {
          obtn.style.display = "none";
        }
        if (!this.isTop) {
          clearInterval(this.timer);
        }
        this.isTop = false;
      };
    },
    goTop() {
      // 箭头函数是词法作用域
      this.timer = setInterval(() => {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(this.timer);
        }
      }, 30);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/style/global";
.go-top {
  width: 100%;
  a {
    width: px2rem(40);
    height: px2rem(40);
    padding: px2rem(10);
    box-sizing: border-box;
    position: fixed;
    background-color: transparent;
    right: px2rem(20);
    bottom: px2rem(20);
    background-image: url("./../assets/goTop.png");
    background-repeat: no-repeat;
    background-size: cover;
    display: none;
  }
}
</style>