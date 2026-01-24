/**
 * 代理接口 - 表示可以被设置到组件及其子组件的代理对象
 */
interface Agent {
  [key: string]: unknown;
}

/**
 * 具有代理属性的组件接口
 */
interface ComponentWithAgent {
  /**
   * 组件关联的代理对象
   */
  _agent: Agent;
  
  /**
   * 遍历所有子组件并对每个子组件执行回调函数
   * @param callback - 对每个子组件执行的回调函数
   */
  forEachChild(callback: (child: ComponentWithAgent) => void): void;
}

/**
 * 设置代理方法 - 为当前组件及其所有子组件设置代理对象
 * 
 * 该方法会：
 * 1. 将代理对象赋值给当前组件的 _agent 属性
 * 2. 递归地为所有子组件设置相同的代理对象
 * 
 * @param agent - 要设置的代理对象
 * @this ComponentWithAgent - 调用此方法的组件实例
 * 
 * @example
 *