/**
 * 获取信息步骤状态
 * 从 Vuex store 的 state 中读取当前的信息步骤值
 * 
 * @returns {number | string} 当前的信息步骤状态值
 * @description 此方法通常用于 Vue 组件中访问全局状态管理的 infoStep 属性
 */
declare function get(): number | string;

export default get;