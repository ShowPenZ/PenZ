// 最简单的react使用方法
// import React from 'react'
// import ReactDOM from "react-dom";

// // 制造一个jsx语法的title组件会被babel转译成React.createElement()方法
// const title = <h1 className="title">hello world!</h1>;

// // ReactDOM.render用来渲染元素
// // 把虚拟的react element变成真实DOM节点渲染到到容器内(根节点)
// ReactDOM.render(
//   title,
//   document.getElementById("root")
// );

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
//   PenZ.createElement("h1", null, "dididi")
// );

// 制造jsx语法的title组件会被babel转译成React.createElement()方法
function Title(props) {
  return PenZ.createElement(
    "h2",
    {
      className: "title",
      style: {
        color: "red",
      },
    },
    props.title,
    PenZ.createElement("h1", null, "dididi")
  );
}

let element = <Title title="我是标题" />;

console.log(element);
// ReactDOM.render用来渲染元素
// 把虚拟的react element变成真实DOM节点渲染到到容器内(根节点)
PenZDOM.render(element, document.getElementById("root"));
