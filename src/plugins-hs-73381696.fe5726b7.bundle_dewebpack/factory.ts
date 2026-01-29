import { GizmoFactory } from './Base/GizmoFactory';
import { Context } from './Context';
import { DisplayLayer } from './DisplayLayer';
import { Entity } from '../Model/Entity';
import { Edge } from '../Model/Edge';
import { Vertex } from '../Model/Vertex';
import { Layer } from '../Model/Layer';
import { Floor } from '../Model/Floor';
import { CoEdge } from '../Model/CoEdge';
import { FloorDimension } from './FloorDimension';
import { WallDimension } from './WallDimension';
import { SplitEdgeDimension } from './SplitEdgeDimension';
import { RepositionProfileEdge } from './RepositionProfileEdge';
import { ProfileEdgeDimension } from './ProfileEdgeDimension';
import { RepositionProfilePoint } from './RepositionProfilePoint';

interface SelectionItem {
  entity: Entity;
}

interface View2D {
  context: Context;
  displayLayers: {
    temp: DisplayLayer;
  };
}

interface Gizmo {
  // Base gizmo interface
}

export class Factory extends GizmoFactory {
  constructor(config: unknown) {
    super(config);
  }

  createSelectionGizmo(selection: SelectionItem[]): Gizmo[] {
    const gizmos: Gizmo[] = [];
    const activeView = HSApp.App.getApp().getActive2DView() as View2D;
    const context = activeView.context;
    const tempLayer = activeView.displayLayers.temp;
    
    let entity: Entity | undefined;
    
    if (selection.length === 1) {
      entity = selection[0].entity;
    }
    
    if (entity) {
      if (entity instanceof HSCore.Model.Edge && entity.isSplitEdge) {
        const splitEdgeDimension = new SplitEdgeDimension(context, tempLayer, entity);
        gizmos.push(splitEdgeDimension);
      }
      
      if (HSCore.Util.Slab.isSlabProfileCoEdge(entity)) {
        const repositionProfileEdge = new RepositionProfileEdge(context, tempLayer, entity as CoEdge);
        gizmos.push(repositionProfileEdge);
      }
      
      if (entity instanceof HSCore.Model.Vertex && HSCore.Util.Slab.isSlabProfileVertex(entity)) {
        const repositionProfilePoint = new RepositionProfilePoint(context, tempLayer, entity);
        gizmos.push(repositionProfilePoint);
      }
    }
    
    return gizmos;
  }

  createEntityGizmo(entity: Entity): Gizmo[] {
    const gizmos: Gizmo[] = [];
    const activeView = HSApp.App.getApp().getActive2DView() as View2D;
    const context = activeView.context;
    
    if (entity instanceof HSCore.Model.Layer) {
      const tempLayer = activeView.displayLayers.temp;
      gizmos.push(new WallDimension(context, tempLayer, entity));
    }
    
    if (entity instanceof HSCore.Model.Floor) {
      const tempLayer = activeView.displayLayers.temp;
      gizmos.push(new FloorDimension(context, tempLayer, entity));
    }
    
    if (entity instanceof HSCore.Model.CoEdge && HSCore.Util.Slab.isSlabProfileCoEdge(entity)) {
      const tempLayer = activeView.displayLayers.temp;
      const profileEdgeDimension = new ProfileEdgeDimension(context, tempLayer, entity);
      gizmos.push(profileEdgeDimension);
    }
    
    return gizmos;
  }
}