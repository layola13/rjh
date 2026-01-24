/**
 * Ceiling Preview Panel Module
 * Provides UI components for visualizing and editing ceiling profiles
 */

import * as React from 'react';
import * as THREE from 'three';

/**
 * 2D/3D point representation
 */
interface Point2D {
  x: number;
  y: number;
  X?: number;
  Y?: number;
}

interface Point3D extends Point2D {
  z?: number;
  Z?: number;
}

/**
 * Ceiling panel configuration data
 */
interface CeilingPanelData {
  /** Callback to show auto ceiling property panel */
  showAutoCeilingProperty?: (faceType: FaceType, properties: FaceProperties) => void;
  /** Outer polygon vertices */
  outer: Point2D[];
  /** Offset distance from outer edge */
  offset: number;
  /** Fillet radius for corners */
  radius: number;
  /** Side face height - lower section */
  sideHeight1: number;
  /** Side face height - upper section */
  sideHeight2: number;
}

/**
 * Face type discriminator
 */
type FaceType = 'frontFace' | 'sideFace';

/**
 * Properties for different face types
 */
type FaceProperties = 
  | { offset: number; radius: number }
  | { height1: number; height2: number };

/**
 * Molding profile configuration
 */
interface MoldingProfile {
  /** SVG path data string */
  profile: string;
  /** Whether to flip the molding vertically */
  flip: boolean;
}

/**
 * Component state
 */
interface CeilingPanelState {
  title: string;
  outer: Point2D[];
  offset: number;
  radius: number;
  faceType: FaceType;
  sideHeight1: number;
  sideHeight2: number;
  containLightSlot: boolean;
  containCeilModling: boolean;
  containLightSlotMolding: boolean;
  ceilMoldingPath: string;
  ceilMoldingFlip: boolean;
  lightMoldingPath: string;
  lightMoldingFlip: boolean;
}

/**
 * Component props
 */
interface CeilingPanelProps {
  data: CeilingPanelData;
}

/**
 * Internal rendering dimensions
 */
interface RenderDimensions {
  svgWidth: number;
  svgHeight: number;
  extrudeWidth1: number;
  extruedeWidth2: number;
}

/**
 * Light band dimensions
 */
interface LightBandDimensions {
  lightBandWidth: number;
  lightBandHeight: number;
}

/**
 * Rectangle configuration for molding
 */
interface MoldingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Circle configuration
 */
interface Circle {
  cx: number;
  cy: number;
  r: number;
}

/**
 * Text element configuration
 */
interface TextConfig {
  x: number;
  y: number;
  value: number;
}

/**
 * Length marking paths and elements
 */
interface LengthMarkElements {
  lenMark3part1: string;
  lenMark3part2: string;
  text3: TextConfig;
  lenMark3Circle1: Circle;
  lenMark3Circle2: Circle;
  lenMark4part1: string;
  lenMark4part2: string;
  text4: TextConfig;
  lenMark4Circle2: Circle;
}

/**
 * Offset marking elements
 */
interface OffsetMarkElements {
  offsetMarkpart1: string;
  offsetMarkpart2: string;
  text: TextConfig;
  offsetMarkCircle1: Circle;
  offsetMarkCircle2: Circle;
}

/**
 * Still mark line paths
 */
interface StillMarkLines {
  stillMarkPathStr1: string;
  stillMarkPathStr2: string;
}

/**
 * SVG styling configuration
 */
interface SideFaceStyles {
  svgStyle: React.CSSProperties;
  strokeStyle: React.CSSProperties;
  dashLineStyle: React.CSSProperties;
  ceilNumberStyle: React.CSSProperties;
  lightNumberStyle: React.CSSProperties;
  markStrokeStyle: React.CSSProperties;
  markTextStyle: React.CSSProperties;
  stillMarkStrokeStyle: React.CSSProperties;
}

/**
 * React component for ceiling panel preview
 */
declare class CeilingPanelComponent extends React.Component<CeilingPanelProps, CeilingPanelState> {
  constructor(props: CeilingPanelProps);

  /**
   * Converts 2D/3D points to THREE.Vector3 array
   */
  private _toVector3(points: Point3D[]): THREE.Vector3[];

  /**
   * Calculates offset based on current state
   */
  private _getOffset(): number;

  /**
   * Finds the shortest edge length in polygon
   */
  private _findShortLength(points: Point2D[]): number;

  /**
   * Renders the front face SVG view
   */
  private _renderFrontFace(): JSX.Element;

  /**
   * Creates side path with light slot geometry
   */
  private _createSidePathWithLightSlot(
    dims: RenderDimensions,
    lightDims: LightBandDimensions,
    width: number
  ): THREE.Vector3[];

  /**
   * Creates light circle indicator
   */
  private _createLightCircle(
    dims: RenderDimensions,
    lightDims: LightBandDimensions
  ): Circle;

  /**
   * Creates side path without light slot
   */
  private _createSidePathWithOutLightSlot(
    dims: RenderDimensions,
    width: number
  ): THREE.Vector3[];

  /**
   * Creates shadow path for background
   */
  private _createShadowPath(
    dims: { svgWidth: number; svgHeight: number },
    offset: number
  ): THREE.Vector3[];

  /**
   * Creates molding rectangle on ceiling
   */
  private _createMoldingRectOnCeiling(
    dims: RenderDimensions,
    size: number
  ): MoldingRect;

  /**
   * Creates molding rectangle on light slot
   */
  private _createMoldingRectOnLightSlot(
    dims: RenderDimensions,
    lightDims: LightBandDimensions
  ): MoldingRect;

  /**
   * Creates length measurement marking paths
   */
  private _createLengthMarkPath(
    dims: RenderDimensions,
    offset: number
  ): LengthMarkElements;

  /**
   * Creates still mark guideline
   */
  private _createStillMarkLine(
    dims: RenderDimensions,
    offset: number
  ): StillMarkLines;

  /**
   * Creates offset measurement marking
   */
  private _createOffsetMarkline(
    dims: RenderDimensions,
    lightDims: LightBandDimensions,
    offset: number
  ): OffsetMarkElements | undefined;

  /**
   * Creates complete side face profile SVG element
   */
  private _createSideFaceProfile(
    pathData: string,
    circle: Circle,
    lengthMarks: LengthMarkElements,
    stillMarks: StillMarkLines,
    offsetMarks: OffsetMarkElements | undefined,
    styles: Partial<SideFaceStyles>
  ): JSX.Element;

  /**
   * Creates ceiling molding profile element
   */
  private _creatCeilMoldingProfile(
    rect: MoldingRect,
    dashStyle: React.CSSProperties,
    textStyle: React.CSSProperties
  ): JSX.Element;

  /**
   * Creates light slot molding profile element
   */
  private _createLightMoldingProfile(
    rectOnLight: MoldingRect,
    rectAlt: MoldingRect,
    dashStyle: React.CSSProperties,
    textStyle: React.CSSProperties
  ): JSX.Element;

  /**
   * Creates shadow path profile element
   */
  private _createShadowPathProfile(
    pathData: string,
    style: React.CSSProperties
  ): JSX.Element;

  /**
   * Returns SVG styling configuration
   */
  private _sideFaceStyle(): SideFaceStyles;

  /**
   * Renders the side face SVG view
   */
  private _renderSideFace(): JSX.Element;

  /**
   * Updates bottom button styling
   */
  private _chageBottomBtnStyle(
    frontBg: string,
    frontColor: string,
    sideBg: string,
    sideColor: string
  ): void;

  /**
   * Triggers property bar update callback
   */
  private _changePropertyBar(
    faceType: FaceType,
    properties: FaceProperties
  ): void;

  /**
   * Switches to front face mode
   */
  frontFaceModeClick(): void;

  /**
   * Switches to side face mode
   */
  sideFaceModeClick(): void;

  /**
   * Renders header icon based on current face type
   */
  private _headerRender(): JSX.Element;

  render(): JSX.Element;
}

/**
 * Singleton manager for ceiling preview panel lifecycle
 */
export default class CeilingPreviewPanelManager {
  private constructor();

  /** Singleton instance reference */
  private static instance?: CeilingPanelComponent;

  /**
   * Creates and mounts the ceiling preview panel
   * @param showPropertyCallback - Callback for property panel updates
   * @param outer - Outer polygon vertices
   * @param offset - Offset distance
   * @param radius - Fillet radius
   * @param sideHeight1 - Lower side height
   * @param sideHeight2 - Upper side height
   */
  static create(
    showPropertyCallback: (faceType: FaceType, properties: FaceProperties) => void,
    outer: Point2D[],
    offset: number,
    radius: number,
    sideHeight1: number,
    sideHeight2: number
  ): void;

  /**
   * Updates offset and radius values
   */
  static updateOffsetRadius(offset: number, radius: number): void;

  /**
   * Updates side height values
   */
  static updateSideHeight(height1: number, height2: number): void;

  /**
   * Toggles light slot visibility
   */
  static createLightSlot(show: boolean): void;

  /**
   * Toggles ceiling molding visibility
   */
  static createMoldingOnCeiling(show: boolean): void;

  /**
   * Toggles light slot molding visibility
   */
  static createMoldingOnLightSlot(show: boolean): void;

  /**
   * Updates ceiling molding profile path
   */
  static updateMoldingOnCeiling(profile: MoldingProfile): void;

  /**
   * Updates light slot molding profile path
   */
  static updateMoldingOnLightSlot(profile: MoldingProfile): void;

  /**
   * Unmounts and destroys the panel
   */
  static destroy(): void;
}