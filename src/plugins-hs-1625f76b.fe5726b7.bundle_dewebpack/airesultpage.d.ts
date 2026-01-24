/**
 * AI Result Page Module
 * Provides the main AI result interface with category navigation and sub-pages
 */

import React from 'react';

/**
 * Category type identifier for AI features
 */
export type AICategory = string;

/**
 * Category item configuration
 */
export interface CategoryItem {
  /** Unique category name/identifier */
  name: string;
  /** Thumbnail image URL for the category */
  thumbnail: string;
  /** Array of category type identifiers (e.g., aiModeler, aiMoodboard, aiMaterial, aistyler) */
  categoryTypes: AICategory[];
}

/**
 * Catalog data structure containing categories
 */
export interface CatalogData {
  /** Array of category items to display */
  categories: CategoryItem[];
}

/**
 * Sub-page identifier type
 * Defines which AI tool sub-page to display
 */
export type SubPageId = 'mainPage' | string;

/**
 * Props for AIResultPage component
 */
export interface AIResultPageProps {
  /** Entry/main text displayed at the top */
  entryText: string;
  /** Page title/heading */
  title: string;
  /** Catalog data containing categories to display */
  catalogData: CatalogData;
  /** Current sub-page identifier */
  subPageId?: SubPageId;
  /** Refresh counter to trigger page updates */
  refreshNum?: number;
}

/**
 * AI Result Page Component
 * 
 * Main component that displays AI-generated results with category navigation.
 * Supports multiple sub-pages including:
 * - Main category overview
 * - AI Modeler
 * - AI Moodboard
 * - AI Material/Texturer
 * 
 * @param props - Component configuration
 * @returns React functional component
 */
export function AIResultPage(props: AIResultPageProps): React.ReactElement;