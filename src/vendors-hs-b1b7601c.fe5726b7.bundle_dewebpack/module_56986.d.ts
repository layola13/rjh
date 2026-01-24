/**
 * 发布行为主题操作符
 * 
 * 创建一个可连接的 Observable，使用 BehaviorSubject 作为多播源。
 * BehaviorSubject 会存储最新的值，并在订阅时立即发送给新订阅者。
 * 
 * @module publishBehavior
 */

import { BehaviorSubject } from 'rxjs';
import { ConnectableObservable } from 'rxjs';
import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs';

/**
 * 返回一个操作符函数，将源 Observable 转换为使用 BehaviorSubject 的 ConnectableObservable
 * 
 * @template T - Observable 发出的值的类型
 * @param initialValue - BehaviorSubject 的初始值，在任何源值发出之前会被发送给订阅者
 * @returns 操作符函数，接收源 Observable 并返回 ConnectableObservable
 * 
 * @example
 *