import axios from "axios";
import Mock from 'mockjs'
        Mock.mock(/\/student/,null);

// // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
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
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});