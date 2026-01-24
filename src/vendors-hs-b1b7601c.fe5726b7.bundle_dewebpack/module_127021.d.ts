/**
 * 将CSS文本应用到DOM元素
 * 
 * @description
 * 此函数用于动态设置DOM元素的样式内容。
 * - 对于支持 styleSheet 的旧版IE元素（<style>标签），直接设置 cssText
 * - 对于现代浏览器，清空元素内容后插入文本节点
 * 
 * @param cssText - 要应用的CSS样式文本
 * @param targetElement - 目标DOM元素（通常是 <style> 标签）
 * 
 * @example
 *