const home = r => require.ensure([], () => r(require('@/page/Home.vue')), 'home')
const category = r => require.ensure([], () => r(require('@/page/Category.vue')), 'category')
const post = r => require.ensure([], () => r(require('@/page/Post.vue')), 'post')
const archive = r => require.ensure([], () => r(require('@/page/Archive.vue')), 'archive')
const message = r => require.ensure([], () => r(require('@/page/Message.vue')), 'message')
const about = r => require.ensure([], () => r(require('@/page/About.vue')), 'about')

export default [{
        path: '',
        component: home,
        meta: {
            keepAlive: true
        }
    },
    //归档
    {
        path: '/archive',
        component: archive,
        meta: {
            keepAlive: true
        }
    },
    // 留言页
    {
        path: '/message',
        component: message,
        meta: {
            keepAlive: true
        }
    },
    //关于我
    {
        path: '/about',
        component: about,
        meta: {
            keepAlive: true
        }
    },
    // 分类
    {
        path: '/category/:categoryName',
        component: category,
        meta: {
            keepAlive: false
        }
    },
    // 文章页
    {
        path: '/posts/:postId',
        component: post,
        meta: {
            keepAlive: false
        }
    }
]