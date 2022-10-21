//渲染库
import { PENZ_TEXT } from "../constant";
import { wrapToVDOM } from "../utils/dom";

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
  let realDOM = createDOM(VDOM);

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

  if (type === PENZ_TEXT) {
    // 如果元素为PENZ_TEXT即string或number，创建文本节点
    realDom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    //根据类里的static中的isPenZClassComponent属性来判断是否为类组件
    if (type.isPenZClassComponent) {
      return mountClassComponent(VDOM);
    } else {
      // 将函数组件剥开执行后实质还是VDOM继续返回给createDOM处理
      return mountFnComponent(VDOM);
    }
  } else {
    realDom = document.createElement(type);
  }

  // 处理属性
  if (props) {
    updateProps(realDom, {}, props);
    if (props.children) {
      let children = props.children;
      // 将纯文本(number,string)转成含有标记(PENZ_TEXT)的对象
      // 这样children就只有数组和对象两种
      children = wrapToVDOM(children);

      if (typeof children === "object" && children.type) {
        mount(children, realDom);
      } else if (Array.isArray(children)) {
        unwrapChildren(props.children, realDom);
      }
    }
  }

  return realDom;
}

function unwrapChildren(children, parentDOM) {
  children.forEach((children) => mount(wrapToVDOM(children), parentDOM));
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
      // 挂载style属性
      let styleProperty = newProps[property];
      for (let attr in styleProperty) {
        DOM.style[attr] = styleProperty[attr];
      }
    } else {
      // 挂载class属性
      DOM[property] = newProps[property];
    }
  }
}

function mountFnComponent(VDOM) {
  const { type: FnComponent, props } = VDOM;
  // type是Function props是参数
  let newVDOM = FnComponent(props);

  return createDOM(newVDOM);
}

function mountClassComponent(VDOM) {
  const { type: ClassComponent, props } = VDOM;
  const instance = new ClassComponent(props);
  // 将类里定义好的render方法内部的VDOM提出
  const newVDOM = instance.render();
  return createDOM(newVDOM);
}

const PenZDOM = { render };

export default PenZDOM;
