// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, updateNewCartAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart
  const updateNewCart = async () => {
    const res = await updateNewCartAPI()
    cartList.value = res.result
  }
  const addCart = async (goods) => {
    const { skuId, count } = goods

    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      updateNewCart()
    } else {
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count += goods.count
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }

  }
  // 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI( [skuId] )
      updateNewCart()
    } else {
      // 思路：
      // 法1. 找到要删除项的下标值 - splice
      // 法2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }

  }
  //清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }
  // 全选功能action
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }


  // 是否全选计算属性
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  //计算属性计算数量和总价
  const allCount = computed(() => cartList.value.reduce((all, item) => all + item.count, 0))
  const allPrice = computed(() => cartList.value.reduce((all, item) => all + item.count * item.price, 0))
  // 3. 购物车已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 4. 已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    allCheck,
    isAll,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewCart
  }
}, {
  persist: true,
})