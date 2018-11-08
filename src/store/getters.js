export const posts = (state) => {
    return state.posts
}

export const categoryList = (state) => {
    return state.categoryList
}

export const categories = (state) => {
    return state.categories
}

export const pageList = (state) => {
    return state.pageList
}

export const other = (state) => {
    return `My name is ${state.name}, I am ${state.age}.`;
}