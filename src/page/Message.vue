<template>
  <div class="message">
    <app-header></app-header>
    <div class="content wrap">
      <section class="page">
        <h2 class="title">说些什么</h2>
        <div class="item" v-for="(item,index) in messages" :key="index">
          <b>{{item.nickname}}：</b>
          <p>{{item.content}}</p>
          <i>——{{item.pub_date}}</i>
        </div>
      </section>
    </div>
    <comment-form submit-name="留言" @submitContent="submitContent"></comment-form>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";
import CommentForm from "../components/CommentForm.vue";

export default {
  name: "message",
  data() {
    return {
      nickname: "",
      message: "",
      messages: []
    };
  },
  components: {
    AppHeader,
    AppFooter,
    CommentForm
  },
  computed: {},
  created() {
    this.getMessages();
  },
  methods: {
    submitContent(msg) {
      if (!msg.nickname) {
        alert("昵称不能为空");
        return;
      }
      if (!msg.content) {
        alert("内容不能为空");
        return;
      }
      this.postMessage(msg);
    },
    postMessage(msg) {
      let url = "/api/messages/";
      this.axios
        .post(url, msg)
        .then(
          function(response) {
            this.messages.push(response.data);
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
            console.log(error.response);
            error.response.data.for;
            alert(
              "status: " +
                error.response.status +
                ";\n" +
                "statusText: " +
                error.response.statusText
            );
          }.bind(this)
        );
    },
    getMessages() {
      let url = "/api/messages/";
      this.axios
        .get(url)
        .then(
          function(response) {
            this.messages = response.data.results;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/style/global";
.content {
  .page {
    width: 80%;
    margin: 30px auto 10px auto;
    line-height: 25px;
    padding: 25px;
    color: blue;
    background-color: #f4f39e;
    border-bottom-left-radius: 20px 500px;
    border-bottom-right-radius: 500px 20px;
    border-top-right-radius: 5px 100px;
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
    position: relative;
    background: repeating-linear-gradient(
      to bottom,
      #f4f39e,
      #f4f39e 24px,
      #6ba2d8 25px
    );
    .item {
      font-style: italic;
      line-height: 25px;
      font-size: 14px;
      overflow: hidden;
      // BFC清除浮动
      p {
        text-indent: 2em;
      }
      i {
        float: right;
        padding-right: 10px;
      }
    }
    .title {
      text-align: center;
      font-size: 18px;
      font-style: italic;
      line-height: 25px;
    }
    &::after {
      width: 30%;
      height: 25px;
      content: "留言板";
      font-size: 18px;
      color: $linkColor;
      text-align: center;
      border: 1px solid rgba(200, 200, 200, 0.8);
      background: rgba(254, 254, 254, 0.6);
      box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
      transform: rotate(-5deg) translateX(-50%) translateY(-50%);
      position: absolute;
      left: 50%;
      top: 0;
    }
  }
}
</style>

