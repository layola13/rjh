/**
 * TriPlanar Material Module
 * 
 * This module provides tri-planar texture mapping material functionality.
 * Tri-planar mapping is a technique that projects textures onto geometry from three
 * orthogonal directions (X, Y, Z axes) and blends them based on surface normals.
 */

import { Material } from '@babylonjs/core/Materials/material';
import { Scene } from '@babylonjs/core/scene';
import { Nullable } from '@babylonjs/core/types';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Matrix } from '@babylonjs/core/Maths/math.vector';

/**
 * Tri-Planar Material
 * 
 * A material that uses tri-planar texture projection to map textures onto meshes.
 * This technique is particularly useful for organic or irregular geometry where
 * traditional UV mapping would be difficult or produce distortion.
 * 
 * @example
 *