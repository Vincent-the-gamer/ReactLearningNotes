/*
  该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

// 引入createStore 专门用于创建Redux中最为核心的store对象
// applyMiddleware: 执行中间件
import {createStore,applyMiddleware} from "redux";

//引入redux-thunk，用于支持异步action,使用时要从redux中引入applyMiddleware,
// 还要在createStore中传入第二个参数，参数是个函数，函数中传入thunk: applyMiddleware(thunk)
import thunk from 'redux-thunk'

//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'

//引入汇总之后的reducer
import allReducers from './reducers/index'

//暴露store
export default createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)))


