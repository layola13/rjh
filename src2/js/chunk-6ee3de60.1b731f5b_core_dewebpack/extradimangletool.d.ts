import Flatten from '@flatten-js/core';
import { DragDrawTool } from './DragDrawTool';
import { Artisan, DrawParams } from './Artisan';
import { ShapeColor, Utils } from './Utils';
import { CirclePoly, ExtraDimAngle } from './Geometry';
import type { View } from './View';
import type { Shape } from './Shape';
import type { Point, Segment } from '@flatten-js/core';

/**
 * Point data tuple for extra dimension angle tool
 * [0]: Point - The vertex point
 * [1]: Shape - The host shape containing the vertex
 * [2]: Segment - The previous edge segment
 * [3]: Segment - The next edge segment
 */
type PointData = [Point, Shape, Segment, Segment];

/**
 * Tool for creating extra dimensional angle annotations at polygon vertices.
 * Allows users to add angle measurements between adjacent edges of shapes.
 * 
 * @class ExtraDimAngleTool
 * @extends {DragDrawTool}
 * 
 * @example
 *