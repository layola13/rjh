import { Subject } from 'rxjs';
import { Subscriber } from 'rxjs';
import { Subscription } from 'rxjs';
import { ObjectUnsubscribedError } from 'rxjs';

/**
 * BehaviorSubject 是一种特殊的 Subject，它存储当前值并在订阅时立即发出该值。
 * 
 * @template T 存储和发出的值的类型
 * 
 * @remarks
 * BehaviorSubject 的特性：
 * - 需要一个初始值，因为它总是必须返回一个订阅时的值
 * - 当观察者订阅时，会立即接收到当前值
 * - 可以通过 getValue() 方法随时获取当前值
 * - 继承自 Subject，因此也可以作为 Observable 和 Observer 使用
 * 
 * @example
 *