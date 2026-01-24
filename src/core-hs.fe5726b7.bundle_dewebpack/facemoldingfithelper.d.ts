/**
 * Helper class for automatically refitting face moldings when face geometry changes.
 * Implements a singleton pattern to ensure only one instance manages face molding updates.
 * 
 * @module FaceMoldingFitHelper
 */

import { Layer, Face } from './Layer';

/**
 * Signal interface for face geometry change notifications
 */
interface ISignal<T = void> {
  /** Add a listener callback */
  listen(callback: () => T): void;
  /** Remove all listeners */
  unlistenAll(): void;
}

/**
 * Face molding utility namespace
 */
declare namespace HSCore.Util.Molding {
  /**
   * Re-apply molding to a face after geometry changes
   */
  function reAddFaceMolding(face: Face): void;
}

/**
 * Helper class that monitors face geometry changes and automatically refits moldings.
 * Use the singleton instance via `getInstance()` to track and apply molding updates.
 */
export declare class FaceMoldingFitHelper {
  /** Singleton instance */
  private static _instance?: FaceMoldingFitHelper;

  /** Set of faces that have changed and need molding updates */
  private _changedFaces: Set<Face>;

  /** Collection of signal listeners for cleanup */
  private signals: Array<ISignal>;

  private constructor();

  /**
   * Start monitoring face geometry changes on the given layer(s).
   * Clears any previous listeners and tracked changes.
   * 
   * @param target - A single Layer or array of Layers to monitor
   */
  startListening(target: Layer | Layer[]): void;

  /**
   * Apply molding updates to all changed faces and stop listening.
   * Automatically cleans up all listeners after refitting.
   */
  autoFit(): void;

  /**
   * Stop monitoring all face changes and clear listeners.
   * Does not apply any pending molding updates.
   */
  stopAllListening(): void;

  /**
   * Get the singleton instance of FaceMoldingFitHelper.
   * Creates the instance on first call.
   * 
   * @returns The singleton instance
   */
  static getInstance(): FaceMoldingFitHelper;
}