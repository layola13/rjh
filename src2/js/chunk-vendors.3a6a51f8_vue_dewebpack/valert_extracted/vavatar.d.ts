/**
 * VAvatar component module
 * Provides avatar display functionality with customizable size and styling
 */

/**
 * VAvatar component for displaying user avatars or profile images
 * @public
 */
export declare class VAvatar {
  /**
   * Creates a new VAvatar instance
   * @param options - Configuration options for the avatar component
   */
  constructor(options?: VAvatarOptions);
}

/**
 * Configuration options for VAvatar component
 * @public
 */
export interface VAvatarOptions {
  /**
   * Size of the avatar (e.g., 'small', 'medium', 'large' or pixel value)
   */
  size?: string | number;
  
  /**
   * Shape of the avatar
   */
  shape?: 'circle' | 'square';
  
  /**
   * Image source URL
   */
  src?: string;
  
  /**
   * Alt text for the avatar image
   */
  alt?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Default export of VAvatar component
 * @public
 */
export default VAvatar;