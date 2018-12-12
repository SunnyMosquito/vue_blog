<template>
  <div class="post">
    <app-header></app-header>
    <article class="markdown-body wrap" v-html="compiledMarkdown"></article>
    <comment :post-id="postId" :post-comment="post.post_comment"></comment>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";
import Comment from "../components/Comment.vue";
import marked from "marked";
import { mapState, mapMutations } from "vuex";
import "github-markdown-css";

export default {
  name: "post",
  data() {
    return {
      post: {},
      postId: this.$route.params.postId
    };
  },
  components: {
    AppHeader,
    AppFooter,
    Comment
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
    this.getPostData(this.postId);
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
              this.SET_POST({ data: response.data });
            }.bind(this)
          )
          .catch(
            function(error) {
              console.log(error);
              this.$router.push("/");
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
.post {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .markdown-body {
    flex: 1;
    margin: px2rem(20) 0;
  }
}
</style>
