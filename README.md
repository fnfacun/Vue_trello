# Vue_trello

## 项目介绍
- 静态 flex 布局，Vue 搭建 trello 团队协作工具

## 技术栈
- vue
- vue-router
- vuex
- moment
- axios

## 文件目录
- src
  - api         -- 请求有关的（接口拦截器等）
  - assets      -- 静态资源
  - components  -- 公共组件
  - filters     -- 过滤器
  - router      -- 路由
  - store       -- 仓库
  - views       -- 视图
  - App.vue     -- 组件入口
  - main.js     -- 主入口

## 视图介绍
- login             登录页
- register          注册页
- home              面板首页
- board             面板
  - list/1/card/1   详情卡片

## 实现功能
- message 状态弹窗组件
- 登录鉴权、用户信息存储以及通用头信息处理
- 登录注册退出功能
- 面板头部弹出式菜单通过组件封装
- 面板列表的拖拽，交换位置，排序功能。
- 添加卡片与卡片组件封装
- 卡片附件上传的静态文件代理
- 使用 moment 格式化卡片日期时间
- 卡片封面的设置和删除
- 展示评论和添加评论功能
- 卡片分页功能

## BUG解决
- 登录不同账号后面板同样，不发生改变，因为数据请求放在 created 初始化的时候。
  - 解决：放在 mounted 实例被挂载后渲染数据。