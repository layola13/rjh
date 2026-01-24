/**
 * React DOM Server v16.14.0
 * Server-side rendering APIs for React components
 * 
 * @license MIT
 * @copyright Facebook, Inc. and its affiliates
 */

declare module 'react-dom/server' {
  import { ReactElement, ReactNode } from 'react';

  /**
   * Render options for controlling the rendering process
   */
  export interface RenderOptions {
    /**
     * Thread ID for concurrent rendering context management
     */
    threadID?: number;
  }

  /**
   * Renders a React element to its initial HTML.
   * React will return an HTML string. You can use this method to generate HTML on the server
   * and send the markup down on the initial request for faster page loads and to allow search
   * engines to crawl your pages for SEO purposes.
   * 
   * @param element - The React element to render
   * @returns HTML string representation of the element
   * 
   * @example
   *