import { Layer } from './Layer';
import { Scene } from './Scene';
import { Ceiling } from './Ceiling';
import { Slab } from './Slab';
import { Logger } from './Logger';

interface Entity {
  getUniqueParent(): Parent;
  getFirstParent(): Entity | undefined;
}

interface Parent {
  ceilingLayer?: Layer;
  lastLayer?: Layer;
  getUnderLayer?: () => Layer | undefined;
  tag?: string;
  getLayerAltitude?(layer: Layer): number;
}

export const LayerUtil = {
  /**
   * Get the layer directly underneath the given layer
   */
  getUnderLayer(layer: Layer | undefined): Layer | undefined {
    if (!layer) return undefined;
    
    const parent = layer.getUniqueParent();
    return parent.ceilingLayer === layer ? parent.lastLayer : layer.prev;
  },

  /**
   * Get the layer associated with an entity
   */
  getEntityLayer(entity: Entity | Layer | Ceiling | Slab | undefined): Layer | undefined {
    if (!entity) return undefined;

    if (entity instanceof Ceiling) {
      const parent = entity.getUniqueParent();
      if (!parent) return undefined;
      
      assert(
        parent.getUnderLayer,
        `unexpected parent ${parent.tag}.`,
        'HSCore.Verify.Error'
      );
      
      return parent.getUnderLayer && parent.getUnderLayer();
    }

    if (entity instanceof Layer) {
      return entity;
    }

    if (entity instanceof Slab) {
      return entity.getBaseLayer();
    }

    return this.getEntityLayer(entity.getFirstParent());
  },

  /**
   * Get the base height of an entity
   */
  getEntityBaseHeight(entity: Entity | Layer | Ceiling | Slab | undefined): number {
    const layer = this.getEntityLayer(entity);
    return layer ? this.getAltitude(layer) : 0;
  },

  /**
   * Get the altitude of a layer
   */
  getAltitude(layer: Layer | undefined): number {
    if (!layer) {
      Logger.console.assert(false, 'undefined layer');
      return 0;
    }

    const parent = layer.getUniqueParent();
    return parent && parent instanceof Scene ? parent.getLayerAltitude(layer) : 0;
  }
};