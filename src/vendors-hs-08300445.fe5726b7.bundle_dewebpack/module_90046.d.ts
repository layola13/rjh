import { RefObject } from 'react';

/**
 * 用于检测点击是否发生在指定元素外部的自定义Hook
 * 
 * @param getElements - 返回要监听的元素数组的函数
 * @param isOpen - 当前打开状态
 * @param setOpen - 设置打开状态的回调函数
 * 
 * @remarks
 * 此Hook会监听全局的mousedown事件，当点击发生在所有指定元素外部时，
 * 会调用setOpen(false)来关闭目标组件。支持Shadow DOM场景。
 * 
 * @example
 *