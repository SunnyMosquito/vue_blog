const home = r => require.ensure([], () => r(require('@/page/Home.vue')), 'home')
const category = r => require.ensure([], () => r(require('@/page/Category.vue')), 'category')
const post = r => require.ensure([], () => r(require('@/page/Post.vue')), 'post')

export default [{
        path: '',
        component: home,
        meta: {
            keepAlive: true
        }
    },
    //首页
    {
        path: '/archive',
        component: home,
        meta: {
            keepAlive: true
        }
    },
    //首页
    {
        path: '/about',
        component: home,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/category/:categoryName',
        component: category,
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/posts/:postId',
        component: post,
        meta: {
            keepAlive: false
        }
    }
]