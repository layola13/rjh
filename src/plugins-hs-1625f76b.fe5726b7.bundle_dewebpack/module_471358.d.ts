/**
 * Redux action creator for showing a component or UI element.
 * 
 * This module exports a default action creator that dispatches a SHOW action.
 * It uses the createAction utility to generate a standardized Redux action.
 * 
 * @module ShowActionCreator
 */

import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

/**
 * Action creator that creates a SHOW action without any payload.
 * 
 * When dispatched, this action typically triggers the display of a UI component,
 * modal, notification, or other visual element in the application state.
 * 
 * @returns A Redux action with type SHOW and no payload
 * 
 * @example
 *