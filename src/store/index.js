import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// 导入 模块
// import goodsListModule from './module/goodsList'
Vue.use(Vuex)

//创建vuex仓库（store）来管理数据
const store = new Vuex.Store({
    strict: true,
    state: {
        goodsData: [
            {id:'1',name:'牙刷', price:20.00, done:false , num:1,totals:20.00},
            {id:'2',name:'百岁山', price:3.00, done:false, num:1,totals:3.00},
            {id:'3',name:'钢笔', price:2.00, done:false, num:1,totals:2.00},
        ]
    },
    mutations: {
        // 商品数量的变化
        goodsNum(state, { num, id }) {
            let index = state.goodsData.findIndex(item => item.id == id)
            state.goodsData[index].num = num
        },
        // 更新指定商品的选中状态
        updateDone(state, obj) {
                    const {
                        id,
                        done
                    } = obj;
                    let index = state.goodsData.findIndex(item => item.id == id)
                    state.goodsData[index].done = done
        },
        // 全选状态的逻辑
        checkOfNoCheck(state, status) {
            state.goodsData.forEach(item => {
                if (status == true) {
                    item.done=false
                } else {
                    item.done=true
                }
            })
        },
        //删除指定商品
        delGoods(state, id) {
            let index= state.goodsData.findIndex(item=>item.id==id)
            state.goodsData.splice(index,1)
        }
    },
    getters: {
        // 求全选矿是否选中
        checkAll(state) {
            let obj = {}
            let result = state.goodsData.every(item => item.done == true)
            obj['done'] = result
            return result
        },
            //求总价格
        totalPrice(state) {
            let result=0
            state.goodsData.map(item => {
                if (item.done) {
                    result += item.price * item.num
                }
            }
            )
            return result*100
        },
        // 单件商品选中状态
        goodsDone(state) {
            let objMap = {};
            state.goodsData.forEach(item => {
                objMap[item.id] = item.done
            })
            return objMap
        },
        //总件数
        goodsTotal(state) {
            let result = 0;
            state.goodsData.map(item => {
                if (item.done) {
                    result += item.num
                }
            })
            return  result
        },
        // // 商品列表没有一个选中禁用bottom按钮
        // btnDisable(state) {
        //     let result = state.goodsData  
        // }
    },
    plugins: [createPersistedState()]
})
export default store