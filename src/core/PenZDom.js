//渲染库
import { PENZ_TEXT } from "../constant";
import { streamlineVDOM } from "../utils/dom";

/**
 * 将VDOM渲染成真实DOM插入容器
 * @param {*} VDOM 虚拟DOM
 * @param {*} container 容器
 */
function render(VDOM, container) {
  mount(VDOM, container);
}

/**
 * 挂载真实DOM到父级容器
 * @param {*} VDOM 虚拟DOM
 * @param {*} parentDOM 父级容器
 */
function mount(VDOM, parentDOM) {
  let realDOM;

  if (typeof VDOM === "string") {
    // 使用jsx语法糖的函数组件中
    // 因为babel将jsx语法转译出来的文本在props.children内，
    // 所以当递归进去到最后一层拿到文本时VDOM是一个字符串
    realDOM = document.createTextNode(VDOM);
  } else {
    realDOM = createDOM(VDOM);
  }

  console.log(realDOM);

  if (realDOM) {
    parentDOM.appendChild(realDOM);
  }
}

/**
 * 将VDOM转为真实DOM
 * @param {*} VDOM 虚拟DOM
 * @return 返回真实DOM
 */
function createDOM(VDOM) {
  if (!VDOM) return null; // null和undefined也是合法的dom

  const { type, props } = VDOM;
  let realDom; // 真实DOM

  console.log(VDOM);
  if (type === PENZ_TEXT) {
    // 如果元素为PENZ_TEXT即string或number，创建文本节点
    realDom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    // 将函数组件剥开执行后实质还是VDOM继续返回给createDOM处理
    return mountFnComponent(VDOM);
  } else {
    realDom = document.createElement(type);
  }

  // 处理属性
  if (props) {
    updateProps(realDom, {}, props);
    if (props.children) {
      let children = props.children;

      if (
        (typeof children === "object" && children.type) ||
        typeof children === "string"
      ) {
        mount(children, realDom);
      } else if (Array.isArray(children)) {
        unwrapChildren(props.children, realDom);
      }
    }
  }

  return realDom;
}

function unwrapChildren(children, parentDOM) {
  children.forEach((children) => mount(children, parentDOM));
}

/**
 * 把新的属性更新到真实DOM上
 * @param {*} DOM 真实DOM
 * @param {*} oldProps 旧的属性对象
 * @param {*} newProps 新的属性对象
 */
function updateProps(DOM, oldProps, newProps) {
  for (let property in newProps) {
    if (property === "children") {
      continue; // 子节点先跳过
    } else if (property === "style") {
      let styleProperty = newProps[property];
      for (let attr in styleProperty) {
        DOM.style[attr] = styleProperty[attr];
      }
    } else if (property === "className") {
      DOM[property] = newProps[property];
    }
  }
}

function mountFnComponent(VDOM) {
  const { type, props } = VDOM;
  // type 是function props是参数
  let newVDOM = type(props);

  return createDOM(newVDOM);
}

const PenZDOM = { render };

export default PenZDOM;
