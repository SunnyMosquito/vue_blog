import * as types from './mutation-type.js';

export default {
    [types.SET_CATEGORY_LIST](state, categoryList) {
        state.categoryList[categoryList.name] = categoryList.data;
    },
    [types.SET_CATEGORIES](state, categories) {
        state.categories = categories;
    },
    [types.SET_POST](state, post) {
        state.posts[post["url"]] = post["post"];
    },
    [types.SET_PAGE_LIST](state, pageData) {
        state.pageList[pageData["url"]] = pageData["response"];
    }
};