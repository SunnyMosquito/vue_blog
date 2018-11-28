<template>
  <form>
    <div>
      <label for="nickname">昵称：</label>
      <input type="text" name="nickname" class="nickname" id="nickname" v-model="nickname">
    </div>
    <div>
      <label for="message-content">内容：</label>
      <textarea
        name="message-content"
        class="message-content"
        id="message-content"
        v-model="message"
      ></textarea>
    </div>
    <div>
      <input type="reset" name="reset" id="reset" class="reset" value="清除">
      <input
        type="submit"
        name="submit"
        id="submit"
        class="submit"
        :value="submitName"
        @click.prevent="submitContent"
      >
    </div>
  </form>
</template>

<script>
export default {
  name: "commentForm",
  data() {
    return {
      nickname: "",
      message: ""
    };
  },
  props: {
    submitName: {
      type: String,
      default: "提交"
    }
  },
  methods: {
    submitContent() {
      console.log("commentForm.vue");
      let comment = { nickname: this.nickname, message: this.message };
      this.$emit("submitContent", comment);
      this.message = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global";
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
</style>
