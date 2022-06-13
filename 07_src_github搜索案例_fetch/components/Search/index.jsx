import React, {Component} from 'react';
// import axios from "axios";
import pubsub from 'pubsub-js'

export default class Search extends Component {
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索Gayhub用户</h3>
                <div>
                    <input ref={c => this.keyWordNode = c} type="text" placeholder="输入要搜索的名字"/>&nbsp;
                    <button onClick={this.search}>搜索</button>
                </div>
            </section>
        );
    }

    search = async() => {
        //获取用户的输入
        const {keyWordNode:{value:keyword}} = this
        //发送请求前通知List更新状态
        //发布消息
        pubsub.publish('updateState',{
            isFirst: false,
            isLoading: true
        })
        pubsub.publish('updateState',{
            isFirst: false,
            isLoading: true
        })
        //发送网络请求--使用axios发送
        // https://api.github.com/search/users?q=${keyword}
        // http://localhost:3000/api1/search/users2?q=${keyword}
        // axios.get(`http://localhost:3000/api1/search/users2?q=${keyword}`).then(
        //     response => {
        //         pubsub.publish('updateState',{
        //             isLoading: false,
        //             users: response.data.items
        //         })
        //     },
        //     error => {
        //         //请求失败后通知App更新状态
        //         pubsub.publish('updateState',{
        //             isLoading: false,
        //             err: error.message
        //         })
        //     }
        // )

        //发送网络请求--fetch发送(未优化)
        // fetch(`http://localhost:3000/api1/search/users2?q=${keyword}`).then(
        //     response => {
        //         console.log('联系服务器成功了')
        //         return response.json()
        //     },
        //     error => {
        //         console.log('联系服务器失败了',error)
        //         //中断Promise链--使用初始化的Promise实例
        //         return new Promise(()=>{})
        //     }
        // ).then(
        //     response => {
        //         console.log('获取数据成功了',response)
        //     },
        //     error => {
        //         console.log('获取数据失败了',error)
        //     }
        // )

        //发送网络请求--fetch发送(优化) --- async & await组合拿到Promise实例的成功返回值
        try{
            const response = await fetch(`http://localhost:3000/api1/search/users2?q=${keyword}`)
            const data = await response.json()
            pubsub.publish('updateState',{
                isLoading: false,
                users: data.items
            })
        }catch(error){
            console.log('请求出错',error)
            pubsub.publish('updateState',{
                isLoading: false,
                err: error.message
            })
        }

    }

}
