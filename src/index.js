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

function FuntionComponent2(props) {
    // return <h1>F：{props.title}</h1>;
    return PenZ.createElement("h1", null, "FP:", props.title);
  }

function FuntionComponent(props) {
  // return <h1>F：{props.title}</h1>;
  // return React.createElement("h1", null, "FP:", props.title);
  return <h1 className="123">
    {props.title || 123}
    <div><FuntionComponent2 title='tutu'/></div>
  </h1>;
}

const body = <FuntionComponent title='test'/>;


// jsx语法的title组件被babel用PenZ.createElement函数转译成vdom
// const title = 'gerkgeporkgpo';
// const title = <h1 className="h1">hello world<div className="content">2324234</div></h1>
// 被babel转成 {
// props : {
//     children:{type: ..., props: ...},
//     className:'title',
//     __self: ...,
//     __source:...,
// }

// PenZDOM.render用来渲染元素
// 把虚拟的penz element变成真实DOM节点渲染到到容器内(根节点)
PenZDOM.render(body, document.getElementById("root"));
