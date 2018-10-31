<template>
  <nav class="nav">
    <ul>
      <li v-show="prev"><router-link to="'/' + current + 1">归档</router-link></li>
      <li v-show="next"><a href="javascript:;" @click.prevent="{current++}">关于我</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      hasPagination: false
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
    current: (oldValue, newValue) => {
      console.log(oldValue + " " + newValue);
    }
  },
  mounted() {},
  methods: {
    prev() {
      this.$emit("pagechange", this.current);
    },
    next() {
      this.$emit("pagechange", this.current);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global";
</style>
