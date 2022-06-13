import {Component} from "react";
import Search from "./components/Search";
import List from "./components/List";

//创建并暴露App组件
export default class App extends Component{
   render() {
       return(
           <div className="container">
               <Search/>
               <List/>
           </div>
       )
   }
}

