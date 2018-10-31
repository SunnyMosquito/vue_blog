<template>
  <header class="header wrap" @click="hideSubMenu">
    <div class="logo">
      <h1>
        <router-link to="/">
          蚊子的个人博客
        </router-link>
      </h1>
    </div>
    <nav class="nav">
      <ul>
        <li><router-link to="/">主页</router-link></li>
        <li>
          <!-- 如果路由里有category就给分类加上active类 -->
          <a @click.stop="toggleSubMenu" 
             :class="{ 'router-link-exact-active' : $route.path.indexOf('category') != -1 }">分类</a>
          <ul class="submenu" v-show="ifSubMenuShow">
            <li v-for="(item, index) in categoryList" :key="index">
              <router-link :to="'/category/' + item.id">{{item.name}}</router-link>
            </li>
          </ul>
        </li>
        <li><router-link to="/archive">归档</router-link></li>
        <li><router-link to="/about">关于我</router-link></li>
      </ul>
    </nav>

  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "AppHeader",
  data() {
    return {
      ifSubMenuShow: false
    };
  },
  created() {
    this.getCategoryList();
  },
  mounted() {},
  computed: {
    ...mapState(["categoryList"])
  },
  methods: {
    // headroom.js
    ...mapMutations(["SET_CATEGORY_LIST"]),
    getCategoryList() {
      let url = "/api/categorys/";
      if (this.categoryList.length < 1) {
        this.axios
          .get(url)
          .then(
            function(response) {
              this.SET_CATEGORY_LIST(response.data);
            }.bind(this)
          )
          .catch(
            function(response) {
              console.log(response);
            }.bind(this)
          );
      }
    },
    toggleSubMenu() {
      this.ifSubMenuShow = !this.ifSubMenuShow;
    },
    hideSubMenu() {
      this.ifSubMenuShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global";
.slide-down-enter,
.slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}
.slide-down-enter-to,
.slide-down-leave {
  transform: translate3d(0, 0, 0);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.9s linear;
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: px2rem(10);
  background-color: $bgColor;
  .logo {
    h1 {
      a {
        display: flex;
        align-items: center;
        height: px2rem(50);
        font-size: px2rem(20);
        font-weight: 800;
        color: $hoverColor;
      }
    }
  }
  .nav {
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: center;
    ul {
      display: flex;
      width: 100%;
      align-items: flex-start;
      li {
        display: flex;
        align-items: center;
        flex: 1;
        flex-direction: column;
        a {
          font-size: px2rem(16);
          padding: px2rem(17) 0;
          color: $linkColor;
          cursor: pointer;
        }
        // vue动态添加的样式，链接被点击后
        .router-link-exact-active {
          color: $hoverColor;
        }
        // 二级导航
        .submenu {
          display: flex;
          align-items: center;
          flex-direction: column;
          li {
            a {
              padding: px2rem(10) 0;
            }
          }
        }
      }
    }
  }
}
</style>


