import {Component} from "react";
import './App.css';
import axios from "axios";

//创建并暴露App组件
export default class App extends Component{
   render() {
       return (
           <div>
               <button onClick={this.getStudentData}>点我获取学生数据</button>
               <button onClick={this.getCarData}>点我获取汽车数据</button>
           </div>
       )
   }

   getStudentData = ()=> {
       axios.get('http://localhost:3000/api1/students').then(
           response => {
               console.log('成功了',response.data)
           },
           error => {
               console.log('成功了',response.data)
           }
       )
   }
   getCarData= ()=> {
       axios.get('http://localhost:3000/api2/cars').then(
            response => {
                console.log('成功了',response.data)
            },
           error => {
               console.log('成功了',response.data)
           }
       )
   }
}

