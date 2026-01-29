import React from 'react';
import ReactDOM from 'react-dom';
import { ArcArrayParamsCard } from './ArcArrayParamsCard';

interface ArcArrayParamsData {
  [key: string]: unknown;
}

export class ArcArrayParamsCardControl {
  private constructor() {}

  /**
   * Creates and renders the ArcArrayParamsCard component
   * @param data - Configuration data for the arc array parameters
   */
  static create(data: ArcArrayParamsData): void {
    let container = document.getElementById('arc-array-params-setting-container');
    
    if (!container) {
      const uiContainer = document.getElementById('ui-container');
      container = document.createElement('div');
      container.setAttribute('id', 'arc-array-params-setting-container');
      uiContainer?.appendChild(container);
    }

    ReactDOM.render(
      React.createElement(ArcArrayParamsCard, { data }),
      container
    );
  }

  /**
   * Updates the ArcArrayParamsCard component with new data
   * @param data - Updated configuration data
   */
  static update(data: ArcArrayParamsData): void {
    ArcArrayParamsCardControl.create(data);
  }

  /**
   * Destroys the ArcArrayParamsCard component and removes its container
   */
  static destroy(): void {
    const container = document.getElementById('arc-array-params-setting-container');
    
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode?.removeChild(container);
    }
  }
}