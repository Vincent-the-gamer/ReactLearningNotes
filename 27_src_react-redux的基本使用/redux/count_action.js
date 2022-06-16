/*
  该文件专门为Count组件生成action对象
*/
import {INCREASE,DECREASE} from './constant'

//同步action,就是指action的值为Object类型的一般对象
//加操作的action
export const createIncrementAction = data => ({type: INCREASE, data})

//减操作的action
export const createDecrementAction = data => ({type: DECREASE, data})

//异步action（当action是函数时) 要安装中间件：redux-thunk
//异步action就是指action的值为函数, 因为函数才能执行异步操作，对象不能
//异步加的action: 等millis毫秒后再加
//异步action中一般都会调用同步action
export const createIncrementAsyncAction = (data,millis) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        },millis)
    }
}
