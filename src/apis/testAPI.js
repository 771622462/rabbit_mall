import http from "@/utils/http";

export function getCategoryAPI() {
    return http.get('home/category/head')
}
// http.get('home/category/head')等效于http({url:'home/category/head'})
//返回的是一个promise对象