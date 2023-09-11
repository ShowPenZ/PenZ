class Component {
  // 当子类继承父类的时候，父类的静态属性也是可以继承的
  // 函数组件和类组件编译后，都会变成函数，
  // 因此加上isReactComponent属性来区分是函数组件还是类组件
  static isReactComponent = true;
  constructor(props) {}
}

export { Component };
