//Person Reducer

import {ADD_PERSON} from "../constant";

//初始化人的列表
const initState = [{id:'001',name:'老电线',age:18}]
export default function personReducer(prevState=initState,action){
    const {type,data} = action
    switch (type){
        case ADD_PERSON:  //若是添加一个人
            // prevState.unshift(data) //此处不可以这样写，这样会导致prevState被改写了，personReducer就不是纯函数了, 而且redux也不能识别状态改变（因为数组的地址没变）
            return [data,...prevState]  // 与prevState.unshift(data)相同
        default:
            return prevState
    }
}