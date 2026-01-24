/**
 * Schematic diagram component for displaying property bar switch diagrams
 * @module SchematicDiagram
 */

import React from 'react';

/**
 * Props for the SchematicDiagram component
 */
export interface SchematicDiagramProps {
  /**
   * Unique identifier for the diagram container
   */
  id: string;
  
  /**
   * Configuration data for the schematic diagram
   */
  data: SchematicDiagramData;
}

/**
 * Data structure for schematic diagram configuration
 */
export interface SchematicDiagramData {
  /**
   * Optional additional CSS class name for styling
   */
  className?: string;
  
  /**
   * URL of the schematic diagram image to display
   */
  imgUrl: string;
}

/**
 * Renders a schematic diagram component with an image
 * Displays a property bar switch diagram with configurable styling
 * 
 * @param props - Component properties
 * @returns React element containing the schematic diagram
 */
export declare function SchematicDiagram(props: SchematicDiagramProps): React.ReactElement;