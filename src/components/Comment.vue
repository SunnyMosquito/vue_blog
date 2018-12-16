<template>
  <section class="comment wrap">
    <h3>评论</h3>
    <div class="list-item" v-for="(comment, index) in postComment" :key="index">
      <div class="list-avatar"></div>
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
import CommentForm from "@/components/CommentForm.vue";
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
      msg.nickname = msg.nickname.replace(/^\s\s*/, "");
      if (!msg.nickname) {
        alert("昵称不能为空");
        return;
      }
      if (!msg.content.replace(/^\s\s*/, "")) {
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
            alert(error);
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
      margin: px2rem(10);
    }
    &:nth-of-type(n) {
      .list-avatar {
        background-color: #ccc;
      }
    }
    &:nth-of-type(2n) {
      .list-avatar {
        background-color: #444;
      }
    }
    &:nth-of-type(3n) {
      .list-avatar {
        background-color: #888;
      }
    }
    .list-content-wrapper {
      display: flex;
      flex: 1;
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
