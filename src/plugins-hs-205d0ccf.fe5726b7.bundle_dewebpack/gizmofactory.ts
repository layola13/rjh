import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

export class GizmoFactory extends HSApp.View.Base.GizmoFactory {
    private _canvas: any;

    constructor() {
        super();
    }

    isActive(): boolean {
        return true;
    }

    createEntityGizmo(entity: HSCore.Model.Floor): any[] {
        const gizmos: any[] = [];
        const tempLayer = this._canvas.displayLayers.temp;
        
        if (!tempLayer) {
            return gizmos;
        }

        const context = this._canvas.context;

        if (entity instanceof HSCore.Model.Floor) {
            const layerEditPlugin = HSApp.App.getApp().pluginManager.getPlugin(
                HSFPConstants.PluginType.LayerEdit
            );

            if (layerEditPlugin) {
                const floorDimensionGizmo = layerEditPlugin.createFloorDimensionGizmo(
                    context,
                    tempLayer,
                    entity
                );
                gizmos.push(floorDimensionGizmo);
            }
        }

        return gizmos;
    }
}