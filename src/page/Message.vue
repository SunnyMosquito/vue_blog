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
      <form>
        <div>
          <label for="nickname">昵称：</label>
          <input type="text" name="nickname" class="nickname" id="nickname" v-model="nickname">
        </div>
        <div>
          <label for="message-content">内容：</label>
          <textarea name="message-content" class="message-content" id="message-content" v-model="message"></textarea>
        </div>
        <div>
          <input type="reset"  name="reset" id="reset" class="reset" value="清除">
          <input type="submit" name="submit" id="submit" class="submit" value="留言" @click.prevent="submit">
        </div>
      </form>
    </div>
    <app-footer></app-footer>
  </div>
  
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";

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
    AppFooter
  },
  computed: {},
  created() {},
  methods: {
    submit() {
      this.messages.push({
        id: 1,
        content: this.message,
        nickname: this.nickname,
        date: this.getNowFormatDate()
      });
      this.message = "";
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
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
  form {
    width: 90%;
    line-height: 80%;
    margin: px2rem(10) auto px2rem(30) auto;
    color: $linkColor;
    div {
      margin-top: px2rem(10);
    }
    label[for="nickname"],
    label[for="message-content"] {
      font-size: px2rem(16);
      width: 20%;
    }
    label[for="message-content"] {
      vertical-align: top;
    }
    .nickname,
    .message-content {
      font-size: px2rem(16);
      width: 80%;
      padding: px2rem(1);
      border-radius: px2rem(5);
      border: px2rem(1) solid $linkColor;
    }
    .message-content {
      height: px2rem(54);
    }
    .submit,
    .reset {
      width: 40%;
      padding-top: px2rem(6);
      padding-bottom: px2rem(6);
      outline: 0;
      border-radius: px2rem(5);
      background-color: #4caf50;
      border: none;
      color: white;
      margin-right: px2rem(2);
    }
    .reset {
      margin-left: px2rem(48);
    }
  }
}
</style>

