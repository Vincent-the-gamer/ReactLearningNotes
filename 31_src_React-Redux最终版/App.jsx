import React, {Component} from 'react';
import Count from "./containers/Count"; //引入Count的容器组件
import Person from "./containers/Person"; //引入Person的容器组件

//创建并暴露App组件
export default class App extends Component{
   render() {
       return(
           <div>
             <Count/>
               <hr/>
             <Person/>
           </div>
       )
   }
}
