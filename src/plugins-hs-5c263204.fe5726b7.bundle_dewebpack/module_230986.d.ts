/**
 * ListItem Component Module
 * 
 * A React component that displays a collection list item with image preview,
 * room details, and interactive detail view functionality.
 * 
 * @module ListItemComponent
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Properties for a list item representing a property/apartment listing
 */
export interface ListItemProps {
  /** The item data to display */
  item: PropertyItem;
}

/**
 * Represents a property/apartment item with all its details
 */
export interface PropertyItem {
  /** URL to the property image */
  imageUrl: string;
  
  /** Neighborhood or area name where the property is located */
  neighbor: string;
  
  /** Gross area in square meters */
  grossAreaNum: number;
  
  /** Number of bedrooms */
  bedroomNum: number;
}

/**
 * ListItem React Component
 * 
 * Displays a property listing card with:
 * - Thumbnail image (optimized with OSS processing)
 * - Gross area and bedroom count
 * - Neighborhood name
 * - Click handler to open detailed view
 * 
 * @example
 *