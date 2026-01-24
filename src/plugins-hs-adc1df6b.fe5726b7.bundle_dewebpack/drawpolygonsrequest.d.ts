/**
 * Module: DrawPolygonsRequest
 * Handles the creation and management of roof drawing polygons in the sketch system.
 */

import { HSCore } from './635589';
import { HSApp } from './518193';

/**
 * Request class for drawing polygons in the 2D sketch system.
 * Extends the base ExDrawLinesRequest to add polygon-specific functionality.
 */
export class DrawPolygonsRequest extends HSApp.ExtraordinarySketch2d.Request.ExDrawLinesRequest {
  /**
   * Reference to the parent Sketch2dBuilder instance
   */
  private sketch2dBuilder: HSCore.Model.RoofsDrawingSketch2dBuilder;

  /**
   * Creates a new DrawPolygonsRequest instance
   * @param sketch2dBuilder - The sketch builder that manages this request
   * @param options - Additional options for the request
   */
  constructor(
    sketch2dBuilder: HSCore.Model.RoofsDrawingSketch2dBuilder,
    options?: unknown
  ) {
    super(sketch2dBuilder, options);
    
    this.sketch2dBuilder = sketch2dBuilder;
    
    // Tag all regions with roof drawing topology identifier
    this._regions.forEach((region) => {
      region.topo = `-1_${HSCore.Model.RoofsDrawingSketch2dBuilder.RegionTopoTag}`;
    });
  }

  /**
   * Executes the polygon drawing request.
   * Updates the appendix and adds the roof drawing region to the scene.
   */
  doRequest(): void {
    super.doRequest();
    this.sketch2dBuilder.updateAppendix();
    this._addRoofDrawingRegion();
  }

  /**
   * Adds a new roof drawing region to the active layer.
   * Creates a region only if the sketch has exactly one face.
   * @private
   */
  private _addRoofDrawingRegion(): void {
    const sketch = this.sketch2dBuilder.getSketch();
    
    // Only create region if sketch has exactly one face
    if (sketch.faces.length === 1) {
      const region = new HSCore.Model.RoofDrawingRegion();
      
      // Clone and set the sketch data
      region.setSketch({ ...sketch });
      
      // Add region to the active roof drawing layer
      const roofsDrawing = HSApp.App.getApp().floorplan?.scene?.activeLayer?.roofsDrawing;
      roofsDrawing?.addChild(region);
    }
  }
}

/**
 * Type definitions for related modules
 */

declare module './635589' {
  export namespace HSCore {
    export namespace Model {
      export class RoofDrawingRegion {
        setSketch(sketch: Sketch): void;
      }
      
      export class RoofsDrawingSketch2dBuilder {
        static RegionTopoTag: string;
        getSketch(): Sketch;
        updateAppendix(): void;
      }
      
      interface Sketch {
        faces: Face[];
      }
      
      interface Face {
        // Face definition
      }
    }
  }
}

declare module './518193' {
  export namespace HSApp {
    export namespace App {
      function getApp(): AppInstance;
    }
    
    export namespace ExtraordinarySketch2d {
      export namespace Request {
        export class ExDrawLinesRequest {
          protected _regions: Region[];
          constructor(builder: unknown, options?: unknown);
          doRequest(): void;
        }
      }
    }
    
    interface AppInstance {
      floorplan?: {
        scene?: {
          activeLayer?: {
            roofsDrawing?: RoofsDrawingContainer;
          };
        };
      };
    }
    
    interface RoofsDrawingContainer {
      addChild(region: unknown): void;
    }
    
    interface Region {
      topo: string;
    }
  }
}