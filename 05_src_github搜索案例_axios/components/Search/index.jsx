import React, {Component} from 'react';
import axios from "axios";

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

    search = () => {
        //获取用户的输入
        const {keyWordNode:{value:keyword}} = this
        //发送请求前通知App更新状态
        this.props.updateAppState({
            isFirst: false,
            isLoading: true
        })
        //发送网络请求
        // https://api.github.com/search/users?q=${keyword}
        // http://localhost:3000/api1/search/users2?q=${keyword}
        axios.get(`http://localhost:3000/api1/search/users2?q=${keyword}`).then(
            response => {
                //请求成功后通知App更新状态
                this.props.updateAppState({
                    isLoading: false,
                    users: response.data.items
                })
            },
            error => {
                //请求失败后通知App更新状态
                this.props.updateAppState({
                    isLoading: false,
                    err: error.message
                })
            }
        )

    }
}
