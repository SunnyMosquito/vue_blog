<template>
  <div class="message">
    <app-header></app-header>
    <div class="content wrap">
      <section class="page">
        <h2 class="title">说些什么</h2>
        <div class="item" v-for="(item,index) in messages" :key="index">
          <b>{{item.nickname}}：</b>
          <p>{{item.content}}</p>
          <i>——{{item.date}}</i>
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
import { getNowFormatDate } from "../config/utils.js";

export default {
  name: "message",
  data() {
    return {
      nickname: "",
      message: "",
      messages: [
        {
          id: 1,
          content:
            "邓公公的声音方落下，那面色苍白的小将军才回过神来，一袭银袍落地，旋即清亮的声音响起。",
          nickname: "admin",
          date: "2012-01-12"
        },
        {
          id: 2,
          content: "李墨衍敛去笑意，眉间轻蹙。",
          nickname: "张三",
          date: "2012-01-12"
        },
        {
          id: 3,
          content:
            "微风袭过，银杏树的枝丫晃了晃，一片银杏叶落到地上。李墨衍蹲下，将其拾起。若是那人见了，估计又要心痛不已了。他可是最宝贝这银杏树的。",
          nickname: "李四",
          date: "2012-01-12"
        }
      ]
    };
  },
  components: {
    AppHeader,
    AppFooter,
    CommentForm
  },
  computed: {},
  created() {},
  methods: {
    submitContent(msg) {
      console.log("message.vue");
      this.messages.push({
        id: 1,
        content: msg.message,
        nickname: msg.nickname,
        date: getNowFormatDate()
      });
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

