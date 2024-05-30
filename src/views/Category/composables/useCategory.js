import {getCategoryAPI} from '@/apis/category'
import { onBeforeRouteUpdate } from 'vue-router';
import {onMounted,ref} from 'vue'
import {useRoute} from 'vue-router'

export function useCategory() {
    //获取路由参数
    const route = useRoute()
    //console.log(route)
    const categoryData = ref({})
    const getcategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => {getcategory()})

    //监测路由参数变化
    onBeforeRouteUpdate((to) => {
      //必须要加个参数to，不能只getcategory（），这样数据获得有滞后性
      getcategory(to.params.id)
    })
    return {categoryData}
}
