/*
  1.该文件是用于创建一个为Count组件服务的reducer, reducer的本质就是一个函数
  2. reducer函数会接到两个参数，分别为：之前的状态（prevState)，动作对象(action)
*/

//初始化时，prevState是undefined,type是'@@redux/INIT.x.x.x.x'，没有data属性
export default function countReducer(prevState=0,action){
    // 从action对象中获取: type, data
    const{ type, data } = action
    //根据type决定如何加工数据
    switch (type){
        //如果是加
        case 'increase' : {
            return prevState + data;
        }
        //如果是减
        case 'decrease' : {
            return prevState - data;
        }
        //初始化时
        default: {
            return prevState;
        }
    }
}