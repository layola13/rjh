import { useRef, useEffect } from 'react';

/**
 * 延迟更新状态的自定义 Hook
 * 
 * @template T - 状态值的类型
 * @param initialValue - 初始状态值
 * @param delay - 延迟时间（毫秒），如果提供则延迟更新状态
 * @returns 返回一个元组：[获取当前值的函数, 设置新值的函数]
 * 
 * @example
 *