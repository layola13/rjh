import { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * 安全的状态更新Hook，在组件卸载后防止状态更新
 * 
 * @template T - 状态值的类型
 * @param initialState - 初始状态值
 * @returns 包含当前状态和安全更新函数的元组
 * 
 * @example
 *