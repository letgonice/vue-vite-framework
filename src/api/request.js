import axios from 'axios'
import Mock from 'mockjs'
import { Toast } from 'vant';

// 创建axios实例 ， 配置请求和响应拦截器
const instance = axios.create({
    baseURL: 'http://127.0.0.1:4000',
    timeout: 10000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log('请求拦截器')
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
Mock.mock(/\/car/,null);
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log('响应拦截器')
    response.data= Mock.mock({
        // act: '@natural(11111,99999)',
        "number|1-1000": 1000,
        "id":'@id',
        name: '@cname',
        'class': '@natural(0,20)班学生',
        superior: '@string("lower", 5)',
        'status|1': true,
        'online|1': true,
        createTime: '@date'
    } );
    Toast.clear()
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    Toast.clear()
    return Promise.reject(error);
});
// 导出axios实例
export default instance