<template>
  <div class="archive">
    <app-header></app-header>
    <section class="category wrap">
      <ul class="year">
        <li v-for="(item,index) in archive" :key="index" @click="item.show=!item.show" class="year-item">
          <h3>{{item.year}}</h3>
          <transition name="collapse-transition"
                      v-on:before-enter="beforeEnter"
                      v-on:enter="enter"
                      v-on:after-enter="afterEnter"
                      v-on:before-leave="beforeLeave"
                      v-on:leave="leave"
                      v-on:after-leave="afterLeave">
            <ul class="detail-date" v-show="item.show">
              <li v-for="(child,i) in item.child" :key="i" class="detail-item">
                <router-link :to="'/posts/' + i + '/'">{{child}}</router-link>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "../components/header/AppHeader.vue";
import AppFooter from "../components/footer/AppFooter.vue";
export default {
  data() {
    return {
      archive: [
        {
          year: 2018,
          show: false,
          child: [
            "2018-11-12 这是一个标题",
            "2018-11-30 这三个都为0，scrollHeight的高度就是真实的内容高度了这三个都为0，scrollHeight的高度就是真实的内容高度了"
          ]
        },
        { year: 2017, show: false, child: ["2017-08-12"] }
      ]
    };
  },
  components: {
    AppHeader,
    AppFooter
  },
  methods: {
    beforeEnter(el) {
      if (!el.dataset) el.dataset = {};
      let styles = window.getComputedStyle(el);
      // 记录展开前的属性值
      el.dataset.oldOverflow = styles.getPropertyValue("overflow");
      el.dataset.oldPaddingTop = styles.getPropertyValue("padding-top");
      el.dataset.oldPaddingBottom = styles.getPropertyValue("padding-bottom");
      // 这三个都为0，scrollHeight的高度就是真实的内容高度了
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
      el.classList.add("collapse-transition");
      el.style.overflow = "hidden";
    },
    enter(el) {
      if (el.scrollHeight !== 0) {
        // 动画过程中，逐渐增大到展开前应占的高度值
        el.style.height = el.scrollHeight + "px";
        console.log(el.scrollHeight);
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }
    },
    afterEnter(el) {
      el.classList.remove("collapse-transition");
      el.style.height = "";
      el.style.overflow = el.dataset.oldOverflow;
    },
    beforeLeave(el) {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    },
    leave(el) {
      if (el.scrollHeight !== 0) {
        el.classList.add("collapse-transition");
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
    },
    afterLeave(el) {
      el.classList.remove("collapse-transition");
      el.style.height = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/global";
.collapse-transition {
  transition: all 0.3s linear;
}
.category {
  margin: px2rem(20) 0;
  .year {
    h3 {
      font-size: px2rem(16);
      font-weight: 700;
    }
    line-height: 80%;
    .year-item {
      border-bottom: px2rem(1) solid $bgColor;
      &:last-child {
        border-bottom: none;
      }
      .detail-date {
        .detail-item {
          display: flex;
          padding-left: px2rem(10);
          border-bottom: px2rem(1) solid $bgColor;
          &:last-child {
            border-bottom: none;
          }
          a {
            color: $linkColor;
            vertical-align: middle;
            font-size: px2rem(12);
            font-weight: 400;
            white-space: nowrap;
            overflow: scroll;
          }
        }
      }
    }
  }
}
</style>
