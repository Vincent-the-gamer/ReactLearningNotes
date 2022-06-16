/*
  该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 引入createStore 专门用于创建Redux中最为核心的store对象
// applyMiddleware: 执行中间件
import {createStore,applyMiddleware,combineReducers} from "redux";
// 引入为count组件服务的reducer
import countReducer from './reducers/count'
//引入Person 的 Reducer
import personReducer from "./reducers/person";
//引入redux-thunk，用于支持异步action,使用时要从redux中引入applyMiddleware,
// 还要在createStore中传入第二个参数，参数是个函数，函数中传入thunk: applyMiddleware(thunk)
import thunk from 'redux-thunk'

//汇总所有reducer，变为一个总的reducer
const allReducers = combineReducers({
    he: countReducer,
    rens: personReducer
})

//暴露store
export default createStore(allReducers,applyMiddleware(thunk))


