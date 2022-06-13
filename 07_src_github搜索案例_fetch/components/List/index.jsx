import React, {Component} from 'react';
import './index.css'
import pubsub from 'pubsub-js'

export default class List extends Component {
    state = {
        users: [],  //初始化状态，users的初始值为数组
        isFirst: true, //是否为第一次打开页面
        isLoading: false, //标识是否处于加载中
        err: '', //存储请求相关的错误信息
    }

    //组件挂载后
    componentDidMount() {
        //订阅消息，更新状态
        this.token = pubsub.subscribe('updateState',(_,stateObj)=>{
            this.setState(stateObj)
        })
    }
    //组件即将卸载前
    componentWillUnmount() {
        pubsub.unsubscribe(this.token)
    }


    render() {
        const {users,isFirst,isLoading,err} = this.state
        return (
            <div className="row">
                {
                    isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
                    isLoading ? <h2>正在搜索中.....</h2> :
                    err ? <h2 style={{color: 'red'}}>{err}</h2>  :
                    users.map(userObj => {
                        return(
                            <div className="card" key={userObj.id}>
                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                    <img src={userObj.avatar_url} style={{width: '100px'}} alt="图片"/>
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
