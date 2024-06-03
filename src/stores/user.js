import { loginAPI } from '@/apis/user'
import {defineStore} from 'pinia'
import {ref} from 'vue'
import { useCartStore } from './cart'
import { mergeCartAPI } from '@/apis/cart'
export const useUserStore =  defineStore('user', () => {
    const userInfo = ref({})
    const cartStore = useCartStore()

    const getUserInfo = async ({account,password}) => {
        const res = await loginAPI({account,password})
        userInfo.value = res.result
        //该接口要求的参数是一个包含这三个属性的对象数组
        mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.updateNewCart()
    }
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    return {userInfo, getUserInfo, clearUserInfo}
    },
    {
        persist: true
    }
)