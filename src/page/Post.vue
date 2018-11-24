<template>
  <div class="post">
    <app-header></app-header>
    <article class="markdown-body wrap" v-html="compiledMarkdown"></article>
    <app-footer></app-footer>
  </div>
  
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";
import marked from "marked";
import { mapState, mapMutations } from "vuex";
import "github-markdown-css";

export default {
  name: "post",
  data() {
    return {
      post: { content: null }
    };
  },
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapState(["posts"]),
    compiledMarkdown() {
      return marked(this.post.content ? this.post.content : "loading...", {
        sanitize: true
      });
    }
  },
  created() {
    this.getPostData(this.$route.params.postId);
  },
  methods: {
    ...mapMutations(["SET_POST"]),
    getPostData(postId) {
      let url = "/api/posts/" + postId + "/";
      if (!this.posts.hasOwnProperty(postId)) {
        this.axios
          .get(url)
          .then(
            function(response) {
              this.post = response.data;
              this.SET_POST({ data: this.post, id: postId });
            }.bind(this)
          )
          .catch(
            function(response) {
              console.log(response);
            }.bind(this)
          );
      } else {
        this.post = this.posts[postId];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/style/global";
.markdown-body {
  margin: px2rem(20) 0;
}
</style>
