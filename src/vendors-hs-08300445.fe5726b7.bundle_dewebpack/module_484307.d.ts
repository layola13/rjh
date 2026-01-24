import { RefObject } from 'react';

/**
 * React Hook: 管理多个 ref 的映射关系
 * 
 * 用于动态创建和管理一组 ref 对象，通常用于列表渲染场景中需要为每个项目维护独立 ref 的情况。
 * 
 * @returns 包含两个函数的元组：
 *   - getRef: 根据 key 获取或创建 ref
 *   - deleteRef: 根据 key 删除 ref
 * 
 * @example
 *