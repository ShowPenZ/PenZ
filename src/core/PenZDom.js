//渲染库
import { PENZ_TEXT } from "../constant";

/**
 * 这里是简化的render方法，render方法还需要考虑线程的阻塞问题
 * render 方法中执行大量计算密集型操作或阻塞操作时，会影响到主线程的执行，
 * 例如阻塞用户界面响应，降低应用性能
 *
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
  const newDOM = createDOM(VDOM);
  if (newDOM) {
    parentDOM.appendChild(newDOM);
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
  let realDom = null; // 真实DOM

  if (type === PENZ_TEXT) {
    // 如果元素为PENZ_TEXT即string或number，创建文本节点
    realDom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    // 函数组件的React元素
    return mountFunctionComponent(VDOM);
  } else {
    realDom = document.createElement(type);
  }

  // 处理属性
  if (props) {
    updateProps(realDom, {}, props);
    if (props.children) {
      const children = props.children;
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

function mountFunctionComponent(VDOM) {
  const { type, props } = VDOM;
  const renderVdom = type(props);

  return createDOM(renderVdom);
}

function unwrapChildren(children, parentDOM) {
  children.forEach((children) => mount(children, parentDOM));
}

/**
 * 把新的属性更新到真实DOM上
 * @param {*} dom 真实DOM
 * @param {*} oldProps 旧的属性对象
 * @param {*} newProps 新的属性对象
 */
function updateProps(dom, oldProps, newProps) {
  for (let property in newProps) {
    if (property === "children") {
      continue; // 子节点先跳过
    } else if (property === "style") {
      const styleProperty = newProps[property];
      for (let attr in styleProperty) {
        dom.style[attr] = styleProperty[attr];
      }
    } else if (property === "className") {
      dom[property] = newProps[property];
    }
  }
}
const PenZDOM = { render };

export default PenZDOM;
