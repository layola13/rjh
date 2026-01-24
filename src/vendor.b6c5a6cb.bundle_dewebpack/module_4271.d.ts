/**
 * @pixi/filter-fxaa - v5.2.4
 * 
 * Fast Approximate Anti-Aliasing (FXAA) filter implementation for PixiJS.
 * 
 * Basic FXAA implementation based on the code on geeks3d.com with the
 * modification that the texture2DLod stuff was removed since it's
 * unsupported by WebGL.
 * 
 * From: https://github.com/mitsuhiko/webgl-meincraft
 * Copyright (c) 2011 by Armin Ronacher.
 * 
 * Licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

import { Filter } from '@pixi/core';

/**
 * FXAA (Fast Approximate Anti-Aliasing) filter for smoothing jagged edges.
 * 
 * This filter applies a post-processing anti-aliasing technique that is
 * more performant than traditional MSAA, especially on mobile devices.
 * 
 * @example
 *