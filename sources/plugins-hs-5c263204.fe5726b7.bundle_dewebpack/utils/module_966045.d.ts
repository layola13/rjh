/**
 * FloorPlan Collection Filter Component
 * 
 * A React component for filtering floor plans by bedroom count and gross area.
 * Provides an interactive UI for users to select filtering criteria.
 */

import React from 'react';

/**
 * Bedroom range filter options
 * - 'to': All bedrooms (no filter)
 * - '1to1': 1 bedroom
 * - '2to2': 2 bedrooms
 * - '3to3': 3 bedrooms
 * - '4to4': 4 bedrooms
 * - '5to': 5+ bedrooms
 */
export type BedRoomRange = 'to' | '1to1' | '2to2' | '3to3' | '4to4' | '5to';

/**
 * Gross area range filter options (in square meters)
 * - 'to': All areas (no filter)
 * - '0to60': Under 60㎡
 * - '60to80': 60-80㎡
 * - '80to120': 80-120㎡
 * - '120to150': 120-150㎡
 * - '150to': 150㎡ and above
 */
export type GrossAreaRange = 'to' | '0to60' | '60to80' | '80to120' | '120to150' | '150to';

/**
 * Dialog status for tracking component state
 * - 'init': Initial state, no filters applied
 * - 'result': Filters applied, showing results
 */
export type DialogStatus = 'init' | 'result';

/**
 * Props for the FloorPlanCollectionFilter component
 */
export interface FloorPlanCollectionFilterProps {
  /**
   * Current bedroom range filter selection
   * @default 'to'
   */
  bedRoomRange?: BedRoomRange;

  /**
   * Current gross area range filter selection
   * @default 'to'
   */
  grossAreaRange?: GrossAreaRange;

  /**
   * Current dialog status
   * @default 'init'
   */
  dialogStatus?: DialogStatus;

  /**
   * Callback fired when a bedroom filter option is clicked
   * @param event - Click event from the filter element
   */
  onClickFilterHouseStyle: (event: React.MouseEvent<HTMLSpanElement>) => void;

  /**
   * Callback fired when an area filter option is clicked
   * @param event - Click event from the filter element
   */
  onClickFilterHouseArea: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * Internal component state
 */
export interface FloorPlanCollectionFilterState {
  /**
   * Current bedroom range filter
   */
  bedRoomRange: BedRoomRange;

  /**
   * Current gross area range filter
   */
  grossAreaRange: GrossAreaRange;

  /**
   * Current dialog status
   */
  dialogStatus: DialogStatus;
}

/**
 * FloorPlan Collection Filter Component
 * 
 * Renders a dual-filter interface for floor plan collections:
 * 1. Bedroom count filter (All, 1, 2, 3, 4, 5+)
 * 2. Gross area filter (All, <60㎡, 60-80㎡, 80-120㎡, 120-150㎡, 150㎡+)
 * 
 * Visually highlights the currently selected filters when dialogStatus is 'result'.
 * 
 * @example
 *