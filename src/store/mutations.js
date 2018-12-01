import * as types from './mutation-type.js';

export default {
    // 分类页面，储存每个分类下的post列表
    [types.SET_CATEGORY_LIST](state, categoryList) {
        state.categoryList[categoryList.name] = categoryList.data;
    },
    // 头部的分类导航
    [types.SET_CATEGORIES](state, categories) {
        state.categories = categories;
    },
    // 保存每个查看过的post
    [types.SET_POST](state, post) {
        state.posts[post.data.id] = post.data;
    },
    // 每一个页面的post列表
    [types.SET_PAGE_LIST](state, pageData) {
        state.pageList[pageData.url] = pageData.response;
    },
    // 修改post_comment
    [types.SET_POST_COMMENT](state, payload) {
        state.posts[payload.id].post_comment.push(payload.data);
    },
};