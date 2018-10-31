import * as types from './mutation-type.js';

export default {
    nameAsyn({
        commit
    }, {
        name
    }) {
        commit(types.SET_NAME, name);
    }
};