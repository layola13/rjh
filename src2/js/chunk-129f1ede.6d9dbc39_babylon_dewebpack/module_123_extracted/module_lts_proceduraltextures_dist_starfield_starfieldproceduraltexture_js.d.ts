import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { Scene } from "core/scene";
import { Nullable } from "core/types";

/**
 * Starfield procedural texture configuration options
 */
export interface IStarfieldProceduralTextureOptions {
  /** Animation time parameter */
  time?: number;
  /** Alpha rotation parameter */
  alpha?: number;
  /** Beta rotation parameter */
  beta?: number;
  /** Zoom level of the starfield */
  zoom?: number;
  /** Formation parameter controlling star distribution */
  formuparam?: number;
  /** Step size for raymarching */
  stepsize?: number;
  /** Tiling factor */
  tile?: number;
  /** Brightness multiplier */
  brightness?: number;
  /** Dark matter density */
  darkmatter?: number;
  /** Distance fading factor */
  distfading?: number;
  /** Color saturation level */
  saturation?: number;
}

/**
 * Procedural texture that generates a starfield effect using raymarching techniques.
 * Creates a dynamic, animatable space background with stars and nebula-like effects.
 * 
 * @example
 *