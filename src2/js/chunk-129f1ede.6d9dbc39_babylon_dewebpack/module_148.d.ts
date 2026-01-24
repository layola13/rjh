import { Observable, Subject, ReplaySubject, iif } from 'rxjs';
import { mergeAll, skip } from 'rxjs/operators';

/**
 * Event structure for stream emissions
 * @template T - Type of the event payload
 */
export interface StreamEvent<T = any> {
  /** Event type identifier */
  type: string;
  /** Event payload data */
  payload: T;
}

/**
 * Configuration map for stream history settings
 * Maps event type to the number of historical events to replay
 */
export type HistorySettingsMap = Map<string, number>;

/**
 * EventStreamManager - Manages multiple event streams with optional replay history
 * 
 * Provides a centralized event bus with support for:
 * - Multiple named event streams
 * - Replay subjects with configurable history depth
 * - Stream selection and emission
 * - Main stream aggregation
 */
export default class EventStreamManager {
  /**
   * Internal map storing all event streams by type
   */
  private _streams: Map<string, Subject<StreamEvent> | ReplaySubject<StreamEvent>>;

  /**
   * Main emitter that broadcasts all stream updates
   */
  private _subjectsEmitter: ReplaySubject<Subject<StreamEvent> | ReplaySubject<StreamEvent>>;

  /**
   * Configuration map defining replay buffer sizes for specific event types
   */
  private _historySettings: HistorySettingsMap;

  /**
   * Creates a new EventStreamManager instance
   * @param historySettings - Optional map defining replay buffer sizes for event types
   */
  constructor(historySettings?: HistorySettingsMap);

  /**
   * Selects an observable stream for a specific event type
   * 
   * @param eventType - The type of events to observe
   * @param skipCount - Number of historical events to skip (only applicable if replay is configured)
   * @returns Observable stream of events for the specified type
   */
  select<T = any>(eventType: string, skipCount?: number): Observable<StreamEvent<T>>;

  /**
   * Gets the main aggregated stream containing all events from all streams
   * 
   * @returns Observable that merges all individual event streams
   */
  getMainStream<T = any>(): Observable<StreamEvent<T>>;

  /**
   * Emits an event to the appropriate stream
   * 
   * @param event - Event object containing type and payload
   */
  emit<T = any>(event: StreamEvent<T>): void;

  /**
   * Internal: Retrieves or creates a stream for the given event type
   * 
   * @param eventType - The event type identifier
   * @returns The subject/replay subject for the event type
   */
  private _selectStream(eventType: string): Subject<StreamEvent> | ReplaySubject<StreamEvent>;

  /**
   * Internal: Updates the main stream emitter with a specific stream
   * 
   * @param eventType - The event type whose stream should be added to main emitter
   */
  private _updateMainStream(eventType: string): void;

  /**
   * Internal: Initializes replay subjects based on history settings
   * 
   * @param historySettings - Map of event types to replay buffer sizes
   */
  private _initReplaySubjects(historySettings: HistorySettingsMap): void;

  /**
   * Internal: Adds a new stream to the manager
   * 
   * @param eventType - The event type identifier
   * @param stream - The subject or replay subject to register
   */
  private _addNewStream(
    eventType: string,
    stream: Subject<StreamEvent> | ReplaySubject<StreamEvent>
  ): void;

  /**
   * Internal: Gets a stream with history sliced by skip count
   * 
   * @param eventType - The event type identifier
   * @param skipCount - Number of historical events to skip (default: 0)
   * @returns Observable with sliced history or standard observable
   */
  private _getStreamWithSlicedHistory<T = any>(
    eventType: string,
    skipCount?: number
  ): Observable<StreamEvent<T>>;
}