/*
  该文件专门为Count组件生成action对象
*/
import {INCREASE,DECREASE} from './constant'
//加操作的action
export const createIncrementAction = data => ({type: INCREASE ,data})

//减操作的action
export const createDecrementAction = data => ({type: DECREASE,data})
