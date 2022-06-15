import React, {Component} from 'react';
//引入store,用于获取redux中保存的状态
import store from '../../redux/store'

export default class Count extends Component {

    //加
    increase = ()=> {
        const {value} = this.selectNumber
        //通知redux加value
        store.dispatch({
            type:'increase',
            data: value*1
        })
    }
    //减
    decrease = ()=> {
        const {value} = this.selectNumber
        store.dispatch({
            type:'decrease',
            data: value*1
        })
    }
    //奇数再加
    increaseIfOdd = ()=> {
        const {value} = this.selectNumber
        const count = store.getState()
        if(count % 2 !== 0){
            store.dispatch({
                type:'increase',
                data: value*1
            })
        }
    }
    //异步加
    increaseAsync = ()=> {
        const {value} = this.selectNumber
        setTimeout(() => {
            store.dispatch({
                type:'increase',
                data: value*1
            })
        },500)
    }

    render() {
        return (
            <div>
                <h1>当前求和为: {store.getState()}</h1>
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
