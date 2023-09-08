//核心库

const { wrapToVDOM } = require("./utils");

/**
 * @desc 创建一个虚拟DOM
 * @param {*} type 元素类型
 * @param {*} config 配置对象 className style
 * @param {*} children 子元素，单个-对象/多个-数组
 */
function createElement(type, config, children) {
  // 克隆配置到props
  let props = Object.assign({}, config);

  let childCount = arguments.length - 2;

  // 如果childCount大于1将props.children变成数组
  if (childCount === 1) {
    props.children = wrapToVDOM(children);
  } else if (childCount > 1) {
    // 从第三个元素开始截取是因为前两个参数是元素类型和配置，只需要子元素
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVDOM);
  }

  return { type, props };
}
const PenZ = {
  createElement,
};

export default PenZ;
