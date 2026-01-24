/**
 * Module: module_value
 * Original ID: value
 * 
 * Selects a stream and optionally applies history slicing based on the provided parameters.
 * 
 * @template T - The type of data emitted by the stream
 * @param streamKey - The key identifier for selecting the stream
 * @param historySize - Optional number of historical items to slice from the stream
 * @returns An Observable that emits values from the selected stream, optionally with sliced history
 */
declare function selectStreamWithHistory<T = unknown>(
  streamKey: string | number,
  historySize?: number
): Observable<T>;

/**
 * Internal method for selecting a stream by key
 * @internal
 */
declare function _selectStream<T>(streamKey: string | number): Subject<T>;

/**
 * Internal method for retrieving a stream with sliced historical data
 * @internal
 */
declare function _getStreamWithSlicedHistory<T>(
  streamKey: string | number,
  sliceSize: number
): Observable<T>;

/**
 * Settings map containing history configuration for streams
 * @internal
 */
declare const _historySettings: Map<string | number, HistoryConfig>;

/**
 * Configuration interface for stream history settings
 */
interface HistoryConfig {
  enabled: boolean;
  maxSize?: number;
  [key: string]: unknown;
}

/**
 * Generic Observable type from RxJS
 */
interface Observable<T> {
  asObservable(): Observable<T>;
}

/**
 * Generic Subject type from RxJS
 */
interface Subject<T> extends Observable<T> {
  next(value: T): void;
  error(error: unknown): void;
  complete(): void;
}