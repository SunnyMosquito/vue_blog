export const name = (state) => {
    return state.name;
}

export const age = (state) => {
    return state.age
}

export const posts = (state) => {
    return state.posts
}

export const categoryList = (state) => {
    return state.categoryList
}

export const other = (state) => {
    return `My name is ${state.name}, I am ${state.age}.`;
}