/**
 * React hooks utilities for batching state updates
 * @module BatchedStateHooks
 */

import { Dispatch, SetStateAction, useState, useRef } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

/**
 * Callback function type that will be executed in a batch
 */
type BatchCallback = () => void;

/**
 * Batcher function type that queues callbacks for batched execution
 */
type BatcherFunction = (callback: BatchCallback) => void;

/**
 * Custom hook that creates a batched state updater
 * 
 * @template T - The type of the state value
 * @param batcher - Function that batches the state updates
 * @param initialState - Initial state value
 * @returns A tuple containing the current state and a batched setState function
 * 
 * @example
 *