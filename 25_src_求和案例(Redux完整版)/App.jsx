import React, {Component} from 'react';
import Count from "./components/Count";

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
