import React, {Component} from 'react';

// 此处不能手动引入store,要在上一级组件通过props来传递
//引入redux的action
import {createDecrementAction,
    createIncrementAction,
    createIncrementAsyncAction
} from '../../redux/count_action'

//引入connect用于连接UI组件与redux
import {connect} from "react-redux";

class Count extends Component {
    //加
    increase = ()=> {
        const {value} = this.selectNumber
        this.props.jia(value*1)
    }
    //减
    decrease = ()=> {
        const {value} = this.selectNumber
        this.props.jian(value*1)
    }
    //奇数再加
    increaseIfOdd = ()=> {
        const {value} = this.selectNumber
        if(this.props.count % 2 !== 0){
            this.props.jia(value*1)
        }

    }
    //异步加
    increaseAsync = ()=> {
        const {value} = this.selectNumber
        this.props.jiaAsync(value*1,500)
    }

    render() {
        //这里可以接收到容器组件传过来的props
        // console.log('UI组件接收到的props是',this.props)
        return (
            <div>
                <h1>当前求和为: {this.props.count}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>&nbsp;
                <button onClick={this.increase}>+</button>&nbsp;
                <button onClick={this.decrease}>-</button>&nbsp;
                <button onClick={this.increaseIfOdd}>当前求和为奇数再加</button>&nbsp;
                <button onClick={this.increaseAsync}>异步加</button>
            </div>
        );
    }
}

//使用connect()()创建并暴露一个Count的容器组件
//connect是个高阶函数（函数的返回值还是函数，也叫做函数的柯里化）
//connect第一个括号里要传入函数，函数的返回值要是对象（因为这里是传props给CountUI)
export default connect(
    //映射状态
    state => ({count: state}),

    //映射操作状态的方法 mapDispatchToProps的简写
    //react-redux的api自动将action分发(dispatch)
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jiaAsync: createIncrementAsyncAction
    }

    //映射操作状态的方法 mapDispatchToProps的一般写法
// dispatch => ({
//         //通知redux执行加法
//         jia: value => dispatch(createIncrementAction(value)),
//         //减法
//         jian: value => dispatch(createDecrementAction(value)),
//         //异步加
//         jiaAsync: (value,time) => dispatch(createIncrementAsyncAction(value,time))
//     })
)(Count)
