<template>
  <section class="pagination">
    <ul>
      <li v-show="prev" class="button-round" @click.prevent="childCurrent--">← 上一页</li>
      <li v-show="next" class="button-round" @click.prevent="childCurrent++">下一页 →</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      childCurrent: this.current
    };
  },
  props: {
    count: {
      // 数据总条数
      type: Number,
      default: 0
    },
    current: {
      // 当前页数
      type: Number,
      default: 1
    },
    next: {
      // 下一页
      type: String,
      default: ""
    },
    prev: {
      // 上一页
      type: String,
      default: ""
    }
  },
  watch: {
    // 子组件不能更改父组件prop
    childCurrent: function(newValue) {
      this.$emit("getPostData", newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global";
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: px2rem(10) 0;
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
</style>
