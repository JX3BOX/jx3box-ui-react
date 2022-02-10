/**
 * 新增 EventEmitter
 * 服务于 layout 相关逻辑
 *
 * @class EventEmitter
 */
class EventEmitter {
  private events: { [key: string]: Function[] };

  constructor() {
    this.events = {};
  }

  on(type: string, listener) {
    /** 因为其他的类可能继承自EventEmitter，子类的events可能为空，保证子类必须存在此实例属性 */
    if (!this.events) {
      this.events = {};
    }
    if (this.events[type]) {
      this.events[type].push(listener);
    } else {
      this.events[type] = [listener];
    }
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(fn => fn.call(this, ...args));
    }
  }

  off(type, listener) {
    if (this.events[type]) {
      const index = this.events[type].indexOf(listener);
      this.events[type].splice(index, 1);
    }
  }
}

export default EventEmitter;
