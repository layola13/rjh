/**
 * DrawFilletGizmo - Fillet drawing gizmo for 2D sketch operations
 * 
 * This module provides a specialized gizmo for creating fillet operations
 * in the HSApp 2D sketch environment. It extends the base Fillet gizmo
 * to provide drawing-specific functionality.
 * 
 * @module DrawFilletGizmo
 */

import type { HSApp } from './HSApp';

/**
 * DrawFilletGizmo class for handling fillet drawing operations in 2D sketches
 * 
 * Extends the base Fillet gizmo from HSApp.ExtraordinarySketch2d.Gizmo to provide
 * specialized drawing capabilities for creating rounded corners (fillets) between
 * two intersecting lines or curves.
 * 
 * @class DrawFilletGizmo
 * @extends {HSApp.ExtraordinarySketch2d.Gizmo.Fillet}
 * 
 * @example
 *