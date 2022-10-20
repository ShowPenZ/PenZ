//核心库

const { wrapToVDOM } = require("../utils/dom");

/**
 * @desc 创建一个虚拟DOM
 * @param {*} type 元素类型
 * @param {*} config 配置对象 className style
 * @param {*} children 子元素，单个-对象/多个-数组
 */
function createElement(type, config, children) {
  let ref; // 可以通过ref获取引用此元素
  let key; // 子元素的key唯一标识

  if (config) {
    delete config._source; // 删除暂时没用的属性 source：bable编译时产生的属性
    delete config._self;
    delete config._owner;
    ref = config.ref;
    key = config.key;
    delete config.ref;
    delete config.key;
  }

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

  return { type, ref, key, props };
}
const PenZ = {
  createElement,
};

export default PenZ;
