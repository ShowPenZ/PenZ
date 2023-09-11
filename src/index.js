//=========PenZ==========

import PenZ from "./core/PenZ";
import PenZDOM from "./core/PenZDom";

// const title = PenZ.createElement(
//   "h2",
//   {
//     className: "title",
//     style: {
//       color: "red",
//     },
//   },
//   "hello world",
//   PenZ.createElement("div", null, "qq"),
//   PenZ.createElement("h1", null, "dididi")
// );

// jsx语法的title组件被babel用PenZ.createElement函数转译成vdom
// const title = 'gerkgeporkgpo';
const title = <h1 className="h1">hello world<div className="content">2324234</div></h1>
// 被babel转成 {
// props : {
//     children:{type: ..., props: ...},
//     className:'title',
//     __self: ...,
//     __source:...,
// }


// PenZDOM.render用来渲染元素
// 把虚拟的penz element变成真实DOM节点渲染到到容器内(根节点)
PenZDOM.render(title, document.getElementById("root"));
