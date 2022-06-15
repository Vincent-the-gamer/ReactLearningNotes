# React学习笔记

## 作者: 诡锋  B站：-诡锋丿Lavafall-

React.js的学习笔记，供本人随时回顾，也欢迎大家参考学习

## 写给读者
### 基本内容
该笔记对应的视频教程：https://www.bilibili.com/video/BV1wy4y1D7JT \
该笔记的使用顺序：
请没有前端框架学习经验的小伙伴从非脚手架的基础部分开始用起，\
当然，我的笔记（其实是一个能直接跑起来的项目）是为了您省去一些不必要的配置麻烦，
在antd组件库的使用这一段，文档和方法完全和视频中不同(视频中的是旧版），所以让您不用再去花时间折腾。\
\
antd官方文档： https://ant-design.gitee.io/docs/react/introduce-cn \
Redux中文文档： https://www.redux.org.cn/

#### 注意
使用antd 4.x版本时将package.json中的scripts按照如下编写
~~~
 "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
~~~
其它情况下，还是直接使用
~~~
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
~~~

### 文件命名习惯
一般来说，在React中的入口文件叫index.js,
而组件尽量使用jsx格式（虽然用js也行，但是不好区分）\
组件文件夹中，使用index.jsx, index.css, index.less这种形式进行命名，
可以让组件引用的时候直接引用对应的组件文件夹即可
~~~
//引入Count组件，本来应该是引入conponents中Count文件夹下的对应的js文件
//但是如果使用index命名,就可以省去这部分，方便引入
import Count from "./components/Count";
~~~

## 部分实用知识点
### BrowserRouter与HashRouter的区别
 1. 底层原理不一样  \
  BrowserRouter使用的是H5的History API,不兼容IE9以下版本。
 （话说我一直想吐槽为啥到了2022年还要兼容IE 23333) \
  补充：来自2022.6.15的我：今天好像宣布微软关闭IE浏览器了233，太好了哈哈哈哈
 2. 路径表现形式不一样  \
    BrowserRouter的路径中没有#  localhost:3000/test/a   \
    HashRouter的路径中有#  localhost:3000/#/test/a 
 3. 刷新后对路由state参数的影响 \
    (1) BrowserRouter没有任何影响，因为state保存在history对象中 \
    (2) HashRouter刷新后会导致路由state参数的丢失！！！（重点）
 4. PS：HashRouter可以解决一些路径错误相关问题

### antd 配置的坑
  在antd 4版本以后，要用craco来管理项目的启动，用craco-less来管理less的配置 \
  在create-react-app 5版本以后,不能直接用npm来安装craco和craco-less了，\
  要使用yarn(虽然antd官方文档也是用的yarn，但是我个人不太喜欢npm和yarn混用)

### 关于浏览器历史记录的push和replace模式
浏览器的历史记录本质上是一个栈的结构，每次访问一个页面就推入到栈中，
如果点击回退则把上层的内容出栈。 \
push模式：浏览器中默认使用push方式，每次将历史记录压入栈中。 \
replace模式： 将目前的栈顶元素直接替换掉。 \
在Vue和React中，均有对应方法来操作：\
Vue: 
~~~
<router-link to="/xxx">aa</router-link> //push模式（默认）
<router-link replace to="/xxx">bb</router-link> //replace模式

this.$router.push("/xxx")  //Vue 2 编程式路由导航 push模式

import {useRouter} from 'vue-router'
const $router = useRouter()
$router.replace("/xxx") // Vue 3 编程式路由导航 replace模式
~~~
React:
~~~ 
<Link to="/xxx">aa</Link>    //push模式（默认）
<Link replace to="/xxx">bb</Link>   //replace模式
~~~

### Redux
工程结构（供参考）：
~~~
 - src
    - redux
       - constant.js //存放常量值
       - xx_action.js  //写actions
       - xx_reducer.js //写reducer
       - store.js  //创建store的总文件
~~~

store:
- (1) 引入redux中的createStore，创建一个store(createStore现已弃用，
暂时先用这个来学，毕竟跟着视频来) \
当然，你也可以
~~~
import {legacy_createStore} from 'redux'
~~~
- (2) createStore调用时要传入一个为其服务的reducer 
- (3) 记得暴露store对象 

reducer: 
- (1) reducer的本质是一个函数，接收：prevState,action，返回加工后的状态
- (2) reducer有两个作用：初始化状态，加工状态
- (3) reducer被第一次调用时，是store自动触发的, \
--- 传递的值是undefined \
--- 传递的action是：{type: '@@REDUX/INIT_s.1.v.4'}  （INIT_后面的是随机值）

注意：
在index.js中监测store中状态的改变，一旦发生改变重新渲染<App/> \
备注：redux只负责管理状态，至于状态的改变驱动着页面的显示这一步，要靠我们自己写。

#### 在redux中使用函数类型的action(用于异步任务)
- 需要使用到redux-thunk中间件(yarn add redux-thunk)。
- 需要在store总文件中，从redux引入applyMiddleware（应用中间件）\
然后在暴露store时传入中间件（是个函数），参数带上thunk就好
~~~
// applyMiddleware: 执行中间件

import {createStore,applyMiddleware} from "redux";

// 引入为count组件服务的reducer
import countReducer from './count_reducer'

//引入redux-thunk，用于支持异步action,使用时要从redux中引入applyMiddleware,
// 还要在createStore中传入第二个参数，参数是个函数，函数中传入thunk: applyMiddleware(thunk)
import thunk from 'redux-thunk'

//暴露store
export default createStore(countReducer,applyMiddleware(thunk))
~~~

注意： 异步action不是必须要写的，完全可以自己等待异步任务的结果后
再去分发同步action。

### React-Redux，让你在React中更舒服的用Redux

1. 所有的UI组件都应该包裹一个父级容器，叫做容器组件
2. 容器组件是真正和redux打交道的，里面可以随意的使用redux的api
3. UI组件中不能使用任何redux的api。
4. 容器组件会传给UI组件：
  - redux中所保存的状态
  - 用于操作状态的方法
5. 备注：容器给UI传递：状态、操作状态的方法，均通过props传递

注意： 在容器组件中，不能直接引入store，要去该容器父级组件里面用props传给
容器组件（暂时，后面有办法优化）


敬请期待后续内容...