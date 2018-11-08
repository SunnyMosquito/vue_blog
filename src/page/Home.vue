<template>
  <div class="home">
    <app-header></app-header>
    <section class="content wrap">
      <div class="post" v-for="(post, index) in postList" :key="index">
        <router-link :to="'posts/' + post.id" class="post-title"><h1>{{post.title}}</h1></router-link>
				<div class="post-info-wrap">
					<span>{{post.pub_date}}</span>
					<span class="cut-off">|</span>
          <router-link to="#">{{post.category_display}}</router-link>
				</div>
				<p class="post-summary">
					{{post.description}}
				</p>
        <router-link :to="'posts/' + post.id" class="button-round">阅读全文 →</router-link>
      </div>
    </section>
    <pagination :count="count"
                :current="current"
                :prev="prev"
                :next="next"
                @getPostData="getPostData" />
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";
import Pagination from "../components/Pagination.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      current: 1,
      count: null,
      prev: "",
      next: "",
      postList: []
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
      if (this.pageList.hasOwnProperty(url)) {
        this.postList = this.pageList[url].results;
        this.prev = this.pageList[url].previous;
        this.next = this.pageList[url].next;
      } else {
        this.axios
          .get(url)
          .then(
            function(response) {
              this.SET_PAGE_LIST({ url: url, response: response.data });
              this.postList = this.pageList[url].results;
              this.prev = this.pageList[url].previous;
              this.next = this.pageList[url].next;
            }.bind(this)
          )
          .catch(
            function(response) {
              console.log(response);
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
  .content {
    color: $bgColor;
    .post {
      padding: px2rem(15) 0;
      border-bottom: px2rem(1) solid $hoverColor;
      .post-title {
        h1 {
          font-size: px2rem(20);
          font-weight: bold;
          color: $bgColor;
        }
      }
      .post-info-wrap {
        padding: px2rem(10) 0;
        font-size: px2rem(14);
        color: $linkColor;
        a {
          color: $linkColor;
        }
      }
      .post-summary {
        font-size: px2rem(14);
        font-weight: 200;
        line-height: 140%;
      }
    }
  }
}
</style>
