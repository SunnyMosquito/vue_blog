<template>
  <div class="home">
    <app-header></app-header>
    <section class="content wrap">
      <div class="post" v-for="(post, index) in postList" :key="index">
        <router-link :to="'posts/' + post.id" class="post-title">
          <h1>{{post.title}}</h1>
        </router-link>
        <div class="post-info-wrap">
          <span>{{post.pub_date}}</span>
          <span class="cut-off">|</span>
          <router-link :to="'/category/' + post.category_display ">{{post.category_display}}</router-link>
        </div>
        <p class="post-summary">{{post.description}}</p>
        <router-link :to="'posts/' + post.id" class="button-round">阅读全文→</router-link>
      </div>
      <div v-show="postList.length < 1">loading...</div>
    </section>
    <pagination
      :count="count"
      :current="current"
      :prev="prev"
      :next="next"
      @getPostData="getPostData"
    />
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/header/AppHeader.vue";
import AppFooter from "@/components/footer/AppFooter.vue";
import Pagination from "@/components/Pagination.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "home",
  data() {
    return {
      current: 1, // 当前在第几页
      count: null, // 总共多少页
      prev: "", // 上一页链接
      next: "", // 下一页链接
      postList: [] // post列表
    };
  },
  components: {
    AppHeader,
    AppFooter,
    Pagination
  },
  created() {
    this.getPostData();
  },
  computed: {
    ...mapState(["pageList"])
  },
  methods: {
    ...mapMutations(["SET_PAGE_LIST"]),
    getPostData(page = 1) {
      let url = `/api/posts/?page=${page}`;
      // 如果venx里面有就不再请求
      if (this.pageList.hasOwnProperty(page)) {
        this.postList = this.pageList[page].results;
        this.prev = this.pageList[page].previous;
        this.next = this.pageList[page].next;
      } else {
        this.axios
          .get(url)
          .then(
            function(response) {
              this.SET_PAGE_LIST({ page: page, response: response.data });
              this.postList = this.pageList[page].results;
              this.prev = this.pageList[page].previous;
              this.next = this.pageList[page].next;
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
.home {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    margin-top: px2rem(10);
    color: $bgColor;
    .post {
      padding: px2rem(10) 0;
      border-bottom: px2rem(1) solid $hoverColor;
      .post-title {
        h1 {
          font-size: px2rem(16);
          font-weight: bold;
          color: $bgColor;
        }
      }
      .post-info-wrap {
        padding: px2rem(8) 0;
        font-size: px2rem(12);
        color: $linkColor;
        a {
          color: $linkColor;
        }
        .cut-off {
          padding-left: px2rem(10);
          padding-right: px2rem(10);
        }
      }
      .post-summary {
        font-size: px2rem(14);
        font-weight: 200;
        line-height: 140%;
      }
      .button-round {
        display: inline-flex;
        box-sizing: border-box;
        padding: px2rem(6) px2rem(14);
        border: px2rem(1) solid #d3d3d3;
        border-radius: px2rem(20);
        background-color: #fff;
        color: #333;
        font-size: px2rem(12);
        font-weight: 300;
      }
    }
  }
}
</style>
