import React from 'react';

/**
 * Props for the UserGuide component
 */
export interface UserGuideProps {
  /**
   * Optional CSS class name to apply to the root element
   */
  className?: string;

  /**
   * Optional callback function to execute when the user guide is clicked.
   * If not provided, default behavior will restart the guide with mask type.
   */
  userGuideCallback?: () => void;
}

/**
 * UserGuide Component
 * 
 * Renders a clickable user guide interface element that allows users to
 * restart or access the application's guided tour. When clicked without
 * a custom callback, it will:
 * 1. Check if the current floorplan has unsaved changes
 * 2. Copy the current design if applicable
 * 3. Reload the page with guide parameters to restart the tutorial
 * 
 * @param props - Component props
 * @returns A React element representing the user guide UI
 */
export function UserGuide(props: UserGuideProps): React.ReactElement;

/**
 * Default export of the UserGuide component
 */
export default UserGuide;