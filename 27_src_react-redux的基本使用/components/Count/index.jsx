import React, {Component} from 'react';

export default class Count extends Component {
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
