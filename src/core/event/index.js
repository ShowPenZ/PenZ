/**
 * @desc 事件绑定函数
 * @param {*} DOM 事件绑定的元素本体
 * @param {*} eventType 事件的类型
 * @param {*} handler 事件绑定处理的函数
 */
function addEvent(DOM, eventType, handler) {
  const storeHandlerFn = DOM.storeHandlerFn || (DOM.storeHandlerFn = {});
  storeHandlerFn[eventType] = handler; //将事件处理函数挂载在元素本体

  if (!document[eventType]) {
    // 将onXX事件委托到document对象上 等待元素被用户操作(点击之类的操作)执行dispatchEvent
    document[eventType] = dispatchEvent;
  }
}

/**
 * @desc 事件派发
 * @param {*} onxx事件挂载进dispathchEvent的event
 */
function dispatchEvent(event) {
  // target 用户操作的本体元素
  // type 为用户的操作类型
  let { target, type } = event;
  const eventType = `on${type}`;

  // 创建合成事件
  const syntheticEvent = createSyntheticEvent(event);

  //模拟React事件冒泡
  while (target) {
    const { storeHandlerFn } = target;
    const handler = storeHandlerFn && storeHandlerFn[eventType];
    // 抛出合成事件属性给用户调用
    handler && handler(syntheticEvent);

    // 当合成事件遇到阻止冒泡通知直接中断循环,在发布阻止冒泡的元素上停下
    if (syntheticEvent.isPropagationStopped) {
      break;
    }

    // 一层一层向上冒泡直至document
    target = target.parentNode; 
  }
}

class SyntheticEvent {
  constructor() {
    this.nativeEvent = "";
  }
}

function createSyntheticEvent(nativeEvent) {
  let syntheticEvent = new SyntheticEvent();
  // 给合成事件对象注入原生事件属性
  for (let e in nativeEvent) {
    syntheticEvent[e] = nativeEvent[e];
  }

  syntheticEvent.nativeEvent = nativeEvent;
  syntheticEvent.preventDefault = preventDefault;
  syntheticEvent.stopPropagation = stopPropagation;
  syntheticEvent.isDefaultPrevented = false;
  syntheticEvent.isPropagationStopped = false;

  return syntheticEvent;
}

/**
 * @desc 阻止默认事件
 */
function preventDefault() {
  const event = this.nativeEvent;
  // 兼容ie
  if (!event) {
    window.event.returnValur = false;
  }
  // 标准浏览器
  if (event.preventDefault) {
    event.preventDefault();
  }
  this.isDefaultPrevented = true;
}

/**
 * @desc 阻止冒泡
 */
function stopPropagation() {
  const event = this.nativeEvent;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    // 兼容
    event.cancelBubble = true;
  }
  this.isPropagationStopped = true;
}

const PenZEvent = {
  addEvent,
};
export default PenZEvent;
