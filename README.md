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
### 纯函数和高阶函数
#### 纯函数
 只要是同样的输入，必定得到同样的输出\
比如
~~~
 function a(param){
   return param;
 }
~~~
规则：
1. 不能改写参数数据。
2. 不会产生任何副作用，比如网络请求，输入和输出设备。
3. 不能调用Date.now()或者Math.random()等不纯的方法 ——
同样的输入(undefined)没有得到同样的输出。
4. Redux的Reducer函数必须是纯函数。

#### 高阶函数
当一个函数的返回值还是函数，它就是高阶函数。\
比如:
~~~
 function a(){
   return () => {
     xxxx
   }
 }
~~~

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

//React编程式路由导航
//注意，在非路由组件中，需要暴露组件时包裹上一层： withRouter(<组件名/>）
this.props.history.push("/xxx")
this.props.history.replace("/xxx")
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

### React-Redux插件库，让你在React中更舒服的用Redux
#### Redux-React案例完整版
如果想查看比较完整，工程结构和变量命名比较规范的Redux-React案例，
请直接打开31_src_React-Redux最终版

#### 基本使用
1. 所有的UI组件都应该包裹一个父级容器，叫做容器组件
2. 容器组件是真正和redux打交道的，里面可以随意的使用redux的api
3. UI组件中不能使用任何redux的api。
4. 容器组件会传给UI组件：
  - redux中所保存的状态
  - 用于操作状态的方法
5. 备注：容器给UI传递：状态、操作状态的方法，均通过props传递

注意： 在容器组件中，不能直接引入store，要去该容器父级组件(比如App)里面用props传给
容器组件。

#### 优化
##### Store的引入
在index.js中引入react-redux的Provider,它会自动给所有容器组件
自动引入store
~~~
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
       <Provider store={store}>
           <App/>
       </Provider>
    </React.StrictMode>
);
~~~
##### Container(容器组件)的写法
容器组件中使用react-redux库的connect()()高阶函数来连接你的普通UI组件和redux的store,
而不是使用普通类式组件的写法。\

~~~
 connect(mapStateToProps,mapDispatchToProps)(UI组件)
   -mapStateToProps: 映射状态，返回值是一个对象
   -mapDispatchToProps: 映射操作状态的方法，返回值是一个对象
~~~
可以将mapDispatchToProps简写成一个对象，而不是一个函数
~~~
export default connect(
    //映射状态 mapStateToProps
    state => ({count: state}),

    //映射操作状态的方法 mapDispatchToProps的简写
    //react-redux的api自动将action分发(dispatch)
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jiaAsync: createIncrementAsyncAction
    }
)(Count)
~~~

##### Store中状态改变的监视
如果您使用了react-redux, connect()()实现了监测store中状态改变，不用再去index.js里面对App组件
store.subscribe()订阅监测了

##### 文件的结构
容器组件和UI组件可以整合成一个文件，在里面写子类(类似于Java的内部类)\
此后，可以不再保留components文件夹，留下container就行。\
在UI组件中，使用this.props.xxx读取状态
~~~
class Count extends Component {
  xxxxxx
  xxx = this.props.xxx
}

export default connect(xxxxx,xxxxx)(Count)
~~~

备注：
1. 容器组件中的store是靠父级组件props传进去的，而不是在容器组件中直接引入
2. mapDispatchToProps也可以是一个对象，此时可以简写，将value直接写成actions
函数，不需要手动传值和接收dispatch参数和调用dispatch，react-redux会帮你自动干这事。

##### react-redux数据共享
注意将所有的reducer合并，使用combineReducers，合并reducers以后，
state是一个拥有所有状态的总对象，所有组件都可以通过key取到对应的值
~~~
//从redux身上引入combineReducers
import {combineReducers} from "redux";

//汇总所有reducer，变为一个总的reducer
const allReducers = combineReducers({
    he: countReducer,
    rens: personReducer
})

//暴露store
export default createStore(allReducers)


//在容器组件中，收到的state是所有内容的总和对象，从里面取出某个key的value
export default connect(
    state => ({
        yiduiren: state.rens,
        he: state.he
    }), //映射状态
    {  //映射操作方法
        jiaYiRen: createAddPersonAction
    }
)(Person)

//在UI组件中收到的总state，从里面取出某个key的value
  let yyy = this.props.yiduiren
~~~

### 谷歌浏览器使用Redux DevTools开发者工具
#### 安装
这里单独提出来说是因为它不是直接在浏览器添加就能使用的，
必须要在react工程里面安装一个库,还要进行配置
~~~
//安装：
yarn add redux-devtools-extension
~~~
#### 配置
~~~
//配置：
//在redux/store.js里面

//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'
~~~
这里分两种情况进行讨论：
如果您在createStore里面只传入了一个参数，则可以将composeWithDevTools()
写入第二个参数

~~~
export default createStore(allReducers,composeWithDevTools())
~~~

在部分案例中，我们使用了
~~~
export default createStore(allReducers,applyMiddleware(thunk))
~~~
来支持action中传入函数而不是对象，以此达成写入异步操作的办法\
但是这也带来了一个问题，就是咱们的composeWithDevTools()不能直接传进去了\
而是使用一个非常奇葩的办法：把applyMiddleware(thunk)作为composeWithDevTools
的参数传进去，就很离谱好吧，不过这是别人API设计咱也没法啊。
~~~
export default createStore(allReducers,composeWithDevTools( applyMiddleware(thunk) ))
~~~

敬请期待后续内容...