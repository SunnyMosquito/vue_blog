<template>
  <section class="comment wrap">
    <h3>评论</h3>
    <div class="list-item" v-for="(comment, index) in postComment" :key="index">
      <img
        class="list-avatar"
        src="http://sucimg.itc.cn/avatarimg/961328461_1523865991659_c55"
        title="流雪"
      >
      <div class="list-content-wrapper">
        <div class="list-content-info">
          <span class="list-nickname">{{comment.nickname}}</span>
          <span class="list-comment-time">{{comment.pub_date}}</span>
        </div>
        <p class="list-content">{{comment.content}}</p>
      </div>
    </div>
    <comment-form submit-name="评论" @submitContent="submitContent"></comment-form>
  </section>
</template>

<script>
import CommentForm from "../components/CommentForm.vue";
import { mapMutations } from "vuex";

export default {
  name: "comment",
  data() {
    return {};
  },
  components: {
    CommentForm
  },
  methods: {
    ...mapMutations(["SET_POST_COMMENT"]),
    submitContent(msg) {
      if (!msg.nickname) {
        alert("昵称不能为空");
        return;
      }
      if (!msg.content) {
        alert("内容不能为空");
        return;
      }
      this.postCommentData(msg);
    },
    postCommentData(msg) {
      msg["post"] = this.postId;
      let url = "/api/comments/";
      this.axios
        .post(url, msg)
        .then(
          function(response) {
            this.SET_POST_COMMENT({ id: this.postId, data: response.data });
          }.bind(this)
        )
        .catch(
          function(error) {
            if (!error.hasOwnProperty("response")) {
              alert(error);
              return;
            }
            let errorData =
              "status: " +
              error.response.status +
              ";\n" +
              "statusText: " +
              error.response.statusText +
              ";\n";
            for (const key in error.response.data) {
              if (error.response.data.hasOwnProperty(key)) {
                const element = error.response.data[key];
                errorData += key.toString() + ": " + element + ";\n";
              }
            }
            alert(errorData);
          }.bind(this)
        );
    }
  },
  props: {
    postId: {
      type: String
    },
    postComment: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global";
.comment {
  h3 {
    font-size: px2rem(24);
    padding: px2rem(10) 0;
  }
  .list-item {
    display: flex;
    .list-avatar {
      width: px2rem(35);
      height: px2rem(35);
      border-radius: 50%;
      padding: px2rem(15);
    }
    .list-content-wrapper {
      display: flex;
      width: 100%;
      font-size: px2rem(12);
      flex-direction: column;
      font-size: px2rem(14);
      padding-right: px2rem(15);
      .list-content-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        line-height: px2rem(35);
        color: $linkColor;
      }
      .list-content {
        line-height: 140%;
        word-break: break-all;
      }
    }
  }
}
</style>
