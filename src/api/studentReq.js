import request from './request.js'
// 获取体育数据
export function fetchCar(){
    return request.get('/car')
}