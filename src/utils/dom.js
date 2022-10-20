import { PENZ_TEXT } from "../constant";

/**
 * @desc 如果childen类型为字符串或者数字则返回type为PENZ_TEXT类型的对象
 *       否则直接返回children,其目的就是为了注入标记
 * @param {*} children
 * @return PenZ Children
 */
function wrapToVDOM(children) {
  return typeof children === "string" || typeof children === "number"
    ? { type: PENZ_TEXT, props: { content: children } }
    : children;
}

// function streamlineVDOM(VDOM) {
//   console.log(VDOM);
//   let newVDOM = _.cloneDeep(VDOM);
//   if (newVDOM) {
//     delete newVDOM._self;
//   }

//   return newVDOM;
// }

export { wrapToVDOM };
