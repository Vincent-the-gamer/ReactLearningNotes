# React学习笔记

## 作者: 诡锋  B站：-诡锋丿Lavafall-

React.js的学习笔记，供本人随时回顾，也欢迎大家参考学习

## 写给读者
该笔记对应的视频教程：https://www.bilibili.com/video/BV1wy4y1D7JT \
该笔记的使用顺序：
请没有前端框架学习经验的小伙伴从非脚手架的基础部分开始用起，\
当然，我的笔记（其实是一个能直接跑起来的项目）是为了您省去一些不必要的配置麻烦，
在antd组件库的使用这一段，文档和方法完全和视频中不同(视频中的是旧版），所以让您不用再去花时间折腾。\
\
antd官方文档： https://ant-design.gitee.io/docs/react/introduce-cn \
Redux中文文档： https://www.redux.org.cn/ （我还没学完这部分，暂时不上笔记）



## 部分实用知识点
### BrowserRouter与HashRouter的区别
 1. 底层原理不一样  \
  BrowserRouter使用的是H5的History API,不兼容IE9以下版本。
 （话说我一直想吐槽为啥到了2022年还要兼容IE 23333) 
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
  要使用yarn(虽然antd官方文档也是用的yarn，但是我个人不太喜欢npm和antd混用)

