import { HSCore } from './HSCore';

interface LightBandParameters {
  flip?: boolean;
  profileWidth?: number;
  [key: string]: unknown;
}

interface MoldingEntity {
  lightBandId: string | number;
  parameters: LightBandParameters;
  resetSize(): void;
  dirtyGeometry(): void;
}

interface ContentEntity {
  children: Record<string, MoldingEntity>;
}

type UpdateField = 'flip' | 'profileWidth' | 'sizeReset';

interface UpdatePayload {
  flip?: boolean;
  profileWidth?: number;
}

export class EditNCustomizedModelLightBandRequest extends HSCore.Transaction.Common.StateRequest {
  private _content: ContentEntity;
  private _lightBandId: string | number;

  constructor(content: ContentEntity, lightBandId: string | number) {
    super();
    this._content = content;
    this._lightBandId = lightBandId;
  }

  onReceive(field: UpdateField, payload: UpdatePayload): [UpdateField, UpdatePayload] {
    const moldingEntity = this.getMoldingEntityById(this._content, this._lightBandId);
    const clonedParameters = _.cloneDeep(moldingEntity.parameters);

    switch (field) {
      case 'flip':
        clonedParameters.flip = payload.flip;
        this._updateLightBand(moldingEntity, clonedParameters);
        break;
      case 'profileWidth':
        clonedParameters.profileWidth = payload.profileWidth;
        this._updateLightBand(moldingEntity, clonedParameters);
        break;
      case 'sizeReset':
        moldingEntity.resetSize();
        break;
    }

    return [field, payload];
  }

  private _updateLightBand(entity: MoldingEntity, parameters: LightBandParameters): void {
    entity.parameters = parameters;
    entity.dirtyGeometry();
  }

  canTransactField(): boolean {
    return true;
  }

  getMoldingEntityById(content: ContentEntity, lightBandId: string | number): MoldingEntity {
    return Object.values(content.children).find(
      (entity) => entity.lightBandId === lightBandId
    )!;
  }

  getDescription(): string {
    return '编辑灯带属性';
  }
}