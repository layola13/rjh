/**
 * Upload component with Dragger functionality
 * 
 * This module exports an Upload component that includes a Dragger subcomponent
 * for drag-and-drop file upload capabilities.
 */

import Upload from './Upload';
import Dragger from './Dragger';

/**
 * Extended Upload component with Dragger as a static property
 */
export interface UploadWithDragger extends typeof Upload {
  /**
   * Dragger component for drag-and-drop file uploads
   * Provides an enhanced user experience by allowing users to drag files
   * into a designated area instead of using the traditional file picker
   */
  Dragger: typeof Dragger;
}

declare const UploadComponent: UploadWithDragger;

export default UploadComponent;