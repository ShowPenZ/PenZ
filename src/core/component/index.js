import { refreshDOM } from "../PenZDom";

export const updateQueue = {
  // 控制同步更新和异步更新
  isBatchingUpdate: false,
  // 记录异步更新的容器
  updaters: [],
  // 批量更新
  batchUpdate() {
    updateQueue.updaters.forEach((updater) => updater.updateComponent());
    // 执行完批量更新后将标识位置为false
    updateQueue.isBatchingUpdate = false;
    // 清空updates容器
    updateQueue.updaters.length = 0;
  },
};

class Updater {
  constructor(props) {
    //保存当前实例
    this.classInstance = props;
    // state收集器
    this.stateCollector = [];
  }

  addState(state) {
    this.stateCollector.push(state);

    // 发送更新
    this.emitUpdate();
  }

  getState() {
    let { classInstance, stateCollector } = this;
    let { state } = classInstance; //上一次的实例保存的state

    // 新旧state合并
    stateCollector.forEach((pendingState) => {
      state = {
        ...state,
        ...pendingState,
      };
    });

    stateCollector.length = 0;

    return state;
  }

  emitUpdate() {
    // 批量更新模式
    if (updateQueue.isBatchingUpdate) {
      // 批量更新为异步，先存入数组
      updateQueue.updaters.push(this);
    } else {
      this.updateComponent();
    }
  }

  updateComponent() {
    let { classInstance, stateCollector } = this;

    // state收集器数组有值的话 去更新
    if (stateCollector.length > 0) {
      shouldUpdateState(classInstance, this.getState());
    }
  }
}
class Component {
  static isPenZClassComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }

  setState(state) {
    this.updater.addState(state);
  }

  forceUpdate() {
    const oldVDOM = this.oldVDOM;
    const oldDOM = oldVDOM.storedRealDom;
    const newVDOM = this.render();
    // 将老DOM父节点与老VDOM新VDOM一同塞进
    refreshDOM(oldDOM.parentNode, oldVDOM, newVDOM);
    // 使下次更新时以上次的新DOM为比较
    this.oldVDOM = newVDOM;
  }
}

function shouldUpdateState(classInstance, newState) {
  classInstance.state = newState;
  classInstance.forceUpdate();
}

export { Component };
