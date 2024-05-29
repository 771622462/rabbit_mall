//引入初始化样式文件
import '@/styles/common.scss'

//引入懒加载指令并且注册
import { lazyPlugin } from './directives'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import { useIntersectionObserver } from '@vueuse/core'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')

//定义全局指令
//  app.directive('img-lazy',{
//     mounted(el,binding) {
//         //el是指令绑定的那个元素  如img
//         //binding是一个对象，binding.value是指令的等于号（即=）后面绑定的表达式的值  如图片url
//         console.log(el,binding)
//         const { stop } = useIntersectionObserver(
//             el,
//             ([{ isIntersecting }]) => {
//               console.log(isIntersecting)
//               if(isIntersecting) {
//                 //进入视口区域
//                 el.src = binding.value
//               }
//             },
//           )
//     }
//  })
