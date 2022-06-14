import React, {Component} from 'react';
import {Button,DatePicker} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import './App.less'

const {RangePicker} = DatePicker;

//创建并暴露App组件
export default class App extends Component{
   render() {
       return(
           <div>
               <Button type="primary">按钮1</Button>
               <Button>按钮2</Button>
               <Button type="dashed">按钮3</Button>
               <Button type="primary" icon={<SearchOutlined/>}>
                   搜索
               </Button>
               <RangePicker showTime
                placeholder={['开始时间','结束时间']}
               />
           </div>
       )
   }
}
