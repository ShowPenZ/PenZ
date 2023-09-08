//=========PenZ==========

import PenZ from "./PenZ";
import PenZDOM from "./PenZDom";

// const title = PenZ.createElement(
//   "h2",
//   {
//     className: "title",
//     style: {
//       color: "red",
//     },
//   },
//   "hello11 world",
//   PenZ.createElement("div", null, "qq"),
//   PenZ.createElement("h1", null, "dididi")
// );

// 制造jsx语法的title组件会被babel转译成vDom
const title = <h1 className="title">123</h1>;
console.log(title);
// PenZDOM.render用来渲染元素
// 把虚拟的penz element变成真实DOM节点渲染到到容器内(根节点)
PenZDOM.render(title, document.getElementById("root"));
