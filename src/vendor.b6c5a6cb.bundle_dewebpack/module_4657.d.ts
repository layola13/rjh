/**
 * AnimatedSprite type definitions
 * A sprite that plays animated textures in sequence
 */

import { Texture } from './Texture';
import { Sprite } from './Sprite';

/**
 * Frame data for animated sprite with duration
 */
export interface FrameObject {
    /** The texture to display for this frame */
    texture: Texture;
    /** Duration in milliseconds for this frame */
    time: number;
}

/**
 * Callback function invoked when animation completes
 */
export type OnCompleteCallback = () => void;

/**
 * Callback function invoked when current frame changes
 * @param currentFrame - The new current frame index
 */
export type OnFrameChangeCallback = (currentFrame: number) => void;

/**
 * Callback function invoked when animation loops
 */
export type OnLoopCallback = () => void;

/**
 * An AnimatedSprite is a simple way to display an animation depicted by a list of textures.
 * Extends Sprite to provide frame-based animation capabilities.
 * 
 * @example
 *