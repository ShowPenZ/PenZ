//核心库

const { wrapToVDOM } = require("../utils");

/**
 * @desc 创建一个虚拟DOM
 * @param {*} type 元素类型
 * @param {*} config 配置对象 className style
 * @param {*} children 子元素，单个-对象/多个-数组
 */
function createElement(type, config, children) {
  // 克隆配置到props
  const props = Object.assign({}, config);

  const argumentsCount = arguments.length - 2;
  // 如果argumentsCount大于1将props.children变成数组
  if (argumentsCount === 1) {
    props.children = wrapToVDOM(children);
  } else if (argumentsCount > 1) {
    // 使用arguments获取所有的参数(包括超出显示声明的参数数量)
    // 将参数列表中的子元素截取为一个数组
    // 从第三个元素开始截取是因为前两个参数是元素类型和配置，只需要子元素
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVDOM);
  }

  return { type, props };
}
const PenZ = {
  createElement,
};

export default PenZ;
