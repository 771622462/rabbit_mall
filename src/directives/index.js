//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app) {
        //懒加载指令逻辑
        app.directive('img-lazy',{
            mounted(el,binding) {
                //el是指令绑定的那个元素  如img
                //binding是一个对象，binding.value是指令的等于号（即=）后面绑定的表达式的值  如图片url
                //console.log(el,binding)
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                      //console.log(isIntersecting)
                      if(isIntersecting) {
                        //进入视口区域
                        el.src = binding.value
                        stop()
                      }
                    },
                  )
            }
         })
    }
}