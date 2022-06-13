import React, {Component} from 'react';
import {NavLink,Route} from 'react-router-dom'
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";  //Header是一般组件
import MyNavLink from "./components/MyNavLink";

//创建并暴露App组件
export default class App extends Component{
   render() {
       return(
           <div>
               <div className="row">
                   <div className="col-xs-offset-2 col-xs-8">
                     <Header/>
                   </div>
               </div>
                 <div className="row">
                   <div className="col-xs-2 col-xs-offset-2">
                       <div className="list-group">
                           {/* 原生html中，靠<a>跳转到不同的页面 */}
                           {/*<a className="list-group-item active" href="./about.html">About</a>*/}
                           {/*<a className="list-group-item" href="./home.html">Home</a>*/}
                           {/* 编写路由链接 --- 在React中靠路由链接实现切换组件 */}
                            <NavLink className="list-group-item" to="/about">About</NavLink>

                           {/*标签体About会放到子组件props里面的children属性里面*/}
                           {/*<MyNavLink to="/about">About</MyNavLink>*/}
                           {/*<MyNavLink to="/home">Home</MyNavLink>*/}
                       </div>
                   </div>
                   <div className="col-xs-6">
                       <div className="panel">
                           <div className="panel-body">
                           {/* 注册路由 */}
                               <Route path="/about" component={About}/>
                               <Route path="/home" component={Home}/>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       )
   }
}

