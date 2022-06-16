// 此处不能手动引入store,要在上一级组件通过props来传递

//引入redux的action
import {createDecrementAction,
    createIncrementAction,
    createIncrementAsyncAction
} from '../../redux/count_action'

//引入Count的UI组件
import CountUI from '../../components/Count';

//引入connect用于连接UI组件与redux
import {connect} from "react-redux";

//mapStateToProps函数把state（状态）映射成props对象，返回的是props对象
//函数返回的对象中的key就做为传递给UI组件中的props的key
//value就作为传递给UI组件props的value
// 用于传递状态
function mapStateToProps(state){
    return {count: state}
}

//mapDispatchToProps函数把dispatch(action的分发)映射成props对象，返回的是props对象
//函数返回的对象中的key就做为传递给UI组件中的props的key
//value就作为传递给UI组件props的value
// 用于操作状态的方法
function mapDispatchToProps(dispatch){
    return {
        //通知redux执行加法
        jia: value => dispatch(createIncrementAction(value)),
        //减法
        jian: value => dispatch(createDecrementAction(value)),
        //异步加
        jiaAsync: (value,time) => dispatch(createIncrementAsyncAction(value,time))
    }
}

//使用connect()()创建并暴露一个Count的容器组件

//connect是个高阶函数（函数的返回值还是函数，也叫做函数的柯里化）
//connect第一个括号里要传入函数，函数的返回值要是对象（因为这里是传props给CountUI)
export default connect(mapStateToProps,mapDispatchToProps)(CountUI)
