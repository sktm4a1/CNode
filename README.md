# CNode网站
尝试构建[NodeJs中文社区](https://cnodejs.org)

## 技术栈

1. react、webpack、node
2. [Material-UI](https://v1.mui.com/getting-started/installation/)组件库
3. [mui](https://v3.mui.com/guides/server-rendering/)

## 注意
1.  先要npm run build 生成dist文件夹，否则后面npm run dev报错。

2.  服务端渲染待完善。
3.  详见webpack.config.js配置。

### Bug
1. tab栏切换后url发生更改，但是不会重新请求数据，导致页面无法刷新
