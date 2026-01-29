import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * Request class for drawing polygon regions in the roof drawing sketch
 */
export class DrawPolygonsRequest extends HSApp.ExtraordinarySketch2d.Request.ExDrawLinesRequest {
    private sketch2dBuilder: HSCore.Model.RoofsDrawingSketch2dBuilder;

    constructor(
        builder: HSCore.Model.RoofsDrawingSketch2dBuilder,
        regions: Array<{ topo?: string }>
    ) {
        super(builder, regions);
        this.sketch2dBuilder = builder;
        
        this._regions.forEach((region) => {
            region.topo = `-1_${HSCore.Model.RoofsDrawingSketch2dBuilder.RegionTopoTag}`;
        });
    }

    /**
     * Execute the request to draw polygons and update the sketch
     */
    doRequest(): void {
        super.doRequest();
        this.sketch2dBuilder.updateAppendix();
        this._addRoofDrawingRegion();
    }

    /**
     * Add a roof drawing region to the active layer if only one face exists
     */
    private _addRoofDrawingRegion(): void {
        const sketch = this.sketch2dBuilder.getSketch();
        
        if (sketch.faces.length === 1) {
            const roofRegion = new HSCore.Model.RoofDrawingRegion();
            roofRegion.setSketch({ ...sketch });
            
            const roofsDrawing = HSApp.App.getApp().floorplan?.scene?.activeLayer?.roofsDrawing;
            
            if (roofsDrawing) {
                roofsDrawing.addChild(roofRegion);
            }
        }
    }
}