import * as types from './mutation-type.js';

export default {
    [types.SET_NAME](state, name) {
        state.name = name;
    },
    [types.SET_CATEGORY_LIST](state, categoryList) {
        state.categoryList = categoryList;
    },
    [types.SET_POST](state, post) {
        state.posts[post["url"]] = post["post"];
    }
};