/**
 * Stream manager that handles multiple RxJS subjects with optional replay history.
 * Provides event emission and stream selection capabilities with history management.
 */

import { Observable, Subject, ReplaySubject } from 'rxjs';
import { skip, mergeAll } from 'rxjs/operators';

/**
 * Event structure for stream emissions
 */
export interface StreamEvent<T = unknown> {
  /** Event type identifier */
  type: string;
  /** Event payload data */
  payload: T;
}

/**
 * Configuration map for stream history settings.
 * Key: stream type identifier
 * Value: number of historical events to replay
 */
export type HistorySettings = Map<string, number>;

/**
 * Stream manager class that orchestrates multiple RxJS subjects with replay capabilities.
 * Supports selective stream access, event emission, and historical event replay.
 */
export default class StreamManager {
  /**
   * Internal storage for all managed streams
   * @private
   */
  private readonly _streams: Map<string, Subject<StreamEvent> | ReplaySubject<StreamEvent>>;

  /**
   * Main stream emitter that merges all individual streams
   * @private
   */
  private readonly _subjectsEmitter: ReplaySubject<Subject<StreamEvent> | ReplaySubject<StreamEvent>>;

  /**
   * Configuration map storing replay history settings per stream type
   * @private
   */
  private readonly _historySettings: HistorySettings;

  /**
   * Creates a new StreamManager instance
   * @param historySettings - Optional map defining replay buffer sizes for specific stream types
   */
  constructor(historySettings?: HistorySettings);

  /**
   * Selects a specific stream by type with optional history slicing
   * @param streamType - The identifier of the stream to select
   * @param skipCount - Number of historical events to skip (default: 0)
   * @returns Observable of the selected stream with applied history settings
   */
  select<T = unknown>(streamType: string, skipCount?: number): Observable<StreamEvent<T>>;

  /**
   * Returns the main merged stream containing all individual streams
   * @returns Observable that emits events from all managed streams
   */
  getMainStream<T = unknown>(): Observable<StreamEvent<T>>;

  /**
   * Emits an event to the appropriate stream based on event type
   * @param event - Event object containing type and payload
   */
  emit<T = unknown>(event: StreamEvent<T>): void;

  /**
   * Retrieves or creates a stream for the given type
   * @param streamType - Stream type identifier
   * @returns The subject associated with the stream type
   * @private
   */
  private _selectStream(streamType: string): Subject<StreamEvent> | ReplaySubject<StreamEvent>;

  /**
   * Updates the main stream emitter with a specific stream
   * @param streamType - Stream type to add to main emitter
   * @private
   */
  private _updateMainStream(streamType: string): void;

  /**
   * Initializes replay subjects based on history settings
   * @param historySettings - Map of stream types to replay buffer sizes
   * @private
   */
  private _initReplaySubjects(historySettings: HistorySettings): void;

  /**
   * Adds a new stream to the manager
   * @param streamType - Stream type identifier
   * @param subject - Subject or ReplaySubject to manage
   * @private
   */
  private _addNewStream(
    streamType: string,
    subject: Subject<StreamEvent> | ReplaySubject<StreamEvent>
  ): void;

  /**
   * Helper method to get stream with sliced history
   * @param streamType - Stream type identifier
   * @param skipCount - Number of events to skip from history
   * @returns Observable with sliced history
   * @private
   */
  private _getStreamWithSlicedHistory<T = unknown>(
    streamType: string,
    skipCount?: number
  ): Observable<StreamEvent<T>>;
}