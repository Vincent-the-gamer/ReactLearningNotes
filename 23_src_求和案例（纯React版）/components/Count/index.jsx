import React, {Component} from 'react';

export default class Count extends Component {
    state = {
        count: 0
    }
    //加
    increase = ()=> {
        const {value} = this.selectNumber
        const {count} = this.state
        this.setState({count: count+value*1 })
    }
    //减
    decrease = ()=> {
        const {value} = this.selectNumber
        const {count} = this.state
        this.setState({count: count-value*1 })
    }
    //奇数再加
    increaseIfOdd = ()=> {
        const {value} = this.selectNumber
        const {count} = this.state
        if(count % 2 !== 0){
            this.setState({count: count+value*1 })
        }
    }
    //异步加
    increaseAsync = ()=> {
        const {value} = this.selectNumber
        const {count} = this.state
        setTimeout(() => {
            this.setState({count: count+value*1 })
        },500)
    }

    render() {
        return (
            <div>
                <h1>当前求和为: {this.state.count}</h1>
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
