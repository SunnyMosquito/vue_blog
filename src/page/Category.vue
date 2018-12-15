<template>
  <div class="category">
    <app-header></app-header>
    <section class="content wrap">
      <h2>{{this.$route.params.categoryName}}</h2>
      <h3 v-if="postList.length < 1">什么也没有...</h3>
      <ul>
        <li v-for="(item, index) in postList" :key="index">
          <router-link :to="'/posts/' + item.id + '/'">{{item.title}}</router-link>
        </li>
      </ul>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "category",
  data() {
    return { postList: [] };
  },
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapState(["categoryList"])
  },
  created() {
    this.getPostData(this.$route.params.categoryName);
  },
  watch: {
    // 路由改变重新获取分类数据,是该页面的路由
    $route: function() {
      this.postList = [];
      this.getPostData(this.$route.params.categoryName);
    }
  },
  methods: {
    ...mapMutations(["SET_CATEGORY_LIST"]),
    getPostData(categoryName) {
      if (!categoryName) {
        this.$router.push("/");
      }
      let url = `api/posts/?category=${categoryName}`;
      if (this.categoryList.hasOwnProperty(categoryName)) {
        this.postList = this.categoryList[categoryName];
      } else {
        this.axios
          .get(url)
          .then(
            function(response) {
              this.SET_CATEGORY_LIST({
                name: categoryName,
                data: response.data.results
              });
              this.postList = response.data.results;
            }.bind(this)
          )
          .catch(
            function(error) {
              alert(error);
              this.$router.push("/");
            }.bind(this)
          );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/style/global";
.category {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    margin-top: px2rem(20);
    margin-bottom: px2rem(20);
    h2,
    h3 {
      text-align: center;
      padding: px2rem(8) 0;
      font-size: px2rem(18);
      border-bottom: px2rem(1) solid $bgColor;
    }
    h3 {
      border: none;
    }
    ul {
      li {
        a {
          display: flex;
          color: $linkColor;
          font-size: px2rem(14);
          padding: px2rem(8) px2rem(4);
          border-bottom: px2rem(1) solid $bgColor;
          white-space: nowrap;
          overflow: scroll;
        }
      }
    }
  }
}
</style>
