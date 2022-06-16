import React, {Component} from 'react';
//引入容器Count组件
import Count from "./containers/Count";
//引入store
import store from './redux/store'

//创建并暴露App组件
export default class App extends Component{
   render() {
       return(
           <div>
             <Count/>
           </div>
       )
   }
}
