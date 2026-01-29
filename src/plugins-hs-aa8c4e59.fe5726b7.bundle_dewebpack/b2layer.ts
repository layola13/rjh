import { B2Processor } from './B2Processor';

interface LayerBomData {
  ID: string;
  displayName: string;
  index: number;
}

interface Layer {
  getInstanceId(): string;
  getParameterValue(key: string): any;
}

interface B2LayerContext {
  layers: Layer[];
}

export class B2Layer extends B2Processor {
  protected context!: B2LayerContext;

  /**
   * Build BOM2 data for all layers in the context
   * @returns Array of layer BOM data objects
   */
  buildBom2Data(): LayerBomData[] {
    return this.context.layers.map((layer: Layer) => {
      return this.buildLayerBomData(layer);
    });
  }

  /**
   * Build BOM data for a single layer
   * @param layer - The layer to build data from
   * @returns Layer BOM data object
   */
  buildLayerBomData(layer: Layer): LayerBomData {
    return {
      ID: layer.getInstanceId(),
      displayName: layer.getParameterValue('displayName'),
      index: layer.getParameterValue('index')
    };
  }
}