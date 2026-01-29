import { Subject } from 'rxjs';
import { dateTimestampProvider } from './dateTimestampProvider';

interface TimestampProvider {
  now(): number;
}

export class ReplaySubject<T> extends Subject<T> {
  private _buffer: T[] = [];
  private _infiniteTimeWindow: boolean = true;
  private _bufferSize: number;
  private _windowTime: number;
  private _timestampProvider: TimestampProvider;

  constructor(
    bufferSize: number = Infinity,
    windowTime: number = Infinity,
    timestampProvider: TimestampProvider = dateTimestampProvider
  ) {
    super();
    this._bufferSize = Math.max(1, bufferSize);
    this._windowTime = Math.max(1, windowTime);
    this._timestampProvider = timestampProvider;
    this._infiniteTimeWindow = windowTime === Infinity;
  }

  next(value: T): void {
    const { isStopped, _buffer, _infiniteTimeWindow, _timestampProvider, _windowTime } = this;
    
    if (!isStopped) {
      _buffer.push(value);
      if (!_infiniteTimeWindow) {
        _buffer.push(_timestampProvider.now() + _windowTime as any);
      }
    }
    
    this._trimBuffer();
    super.next(value);
  }

  protected _subscribe(subscriber: any): any {
    this._throwIfClosed();
    this._trimBuffer();

    const subscription = this._innerSubscribe(subscriber);
    const { _infiniteTimeWindow, _buffer } = this;
    const buffer = _buffer.slice();
    
    for (let i = 0; i < buffer.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(buffer[i]);
    }

    this._checkFinalizedStatuses(subscriber);
    return subscription;
  }

  private _trimBuffer(): void {
    const { _bufferSize, _timestampProvider, _buffer, _infiniteTimeWindow } = this;
    const maxBufferLength = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;

    if (_bufferSize < Infinity && maxBufferLength < _buffer.length) {
      _buffer.splice(0, _buffer.length - maxBufferLength);
    }

    if (!_infiniteTimeWindow) {
      const now = _timestampProvider.now();
      let trimIndex = 0;

      for (let i = 1; i < _buffer.length && (_buffer[i] as any) <= now; i += 2) {
        trimIndex = i;
      }

      if (trimIndex) {
        _buffer.splice(0, trimIndex + 1);
      }
    }
  }
}