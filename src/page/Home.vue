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
    <section class="pagination">
      <nav>
        <ul>
          <li v-show="prev"><a href="#" class="button-round" @click.prevent="current--">← 上一页</a></li>
          <li v-show="next"><a href="#" class="button-round" @click.prevent="current++">下一页 →</a></li>
        </ul>
      </nav>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";
export default {
  name: "Home",
  data() {
    return {
      current: 1,
      prev: "",
      next: "",
      postList: [],
      response: {}
    };
  },
  components: {
    AppHeader,
    AppFooter
  },
  created() {
    this.getPostData();
  },
  watch: {
    current(newValue, oldValue) {
      console.log(oldValue);
      this.getPostData(newValue);
    }
  },
  methods: {
    getPostData(page) {
      let url = "/api/posts/";
      if (page) {
        url += `?page=${page}`;
      }
      if (this.response.hasOwnProperty(url)) {
        this.postList = this.response[url].data.results;
        this.next = this.response[url].data.next;
        this.prev = this.response[url].data.previous;
      } else {
        this.axios
          .get(url)
          .then(
            function(response) {
              this.response[url] = response;
              this.postList = response.data.results;
              this.next = response.data.next;
              this.prev = response.data.previous;
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: px2rem(10) 0;
  nav {
    ul {
      display: flex;
      li {
        display: flex;
        &:last-child {
          padding-left: px2rem(10);
        }
      }
    }
  }
}
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
