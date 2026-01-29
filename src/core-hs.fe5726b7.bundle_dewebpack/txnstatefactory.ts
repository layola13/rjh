import { ContentTxnState } from './ContentTxnState';
import { CustomizedFeatureModelTxnState } from './CustomizedFeatureModelTxnState';
import { EntityTxnState } from './EntityTxnState';
import { LayerTxnState } from './LayerTxnState';
import { VertexTxnState } from './VertexTxnState';
import { RoomBuilderTxnState } from './RoomBuilderTxnState';
import { CustomizedModelTxnState } from './CustomizedModelTxnState';

interface TxnState {
  // Define the transaction state interface based on your requirements
}

type SupportedEntity = 
  | HSCore.Model.Layer
  | HSCore.Model.CustomizedModel
  | HSCore.Model.CustomizedFeatureModel
  | HSCore.Model.Content
  | HSCore.Model.Vertex
  | HSCore.Model.Geom.RoomBuilder
  | HSCore.Model.Entity;

export class TxnStateFactory {
  constructor() {}

  static createTxnState(entity: SupportedEntity, context: unknown): TxnState {
    let state: TxnState;

    if (entity instanceof HSCore.Model.Layer) {
      state = new LayerTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.CustomizedModel) {
      state = new CustomizedModelTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.CustomizedFeatureModel) {
      state = new CustomizedFeatureModelTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.Content) {
      state = new ContentTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.Vertex) {
      state = new VertexTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.Geom.RoomBuilder) {
      state = new RoomBuilderTxnState(entity, context);
    } else {
      state = new EntityTxnState(entity, context);
    }

    return state;
  }
}