import { HSCore, HSCatalog } from './types';

interface WallFaceAssemblyRequestParams {
  id: string;
  name: string;
  productType: HSCatalog.ProductTypeEnum;
  contentType: HSCatalog.ContentTypeEnum;
}

/**
 * Request to create a wall face assembly from units
 */
export class CreateWallFaceAssemblyRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _hostFace: HSCore.Model.WallFace;
  private readonly _units: Array<HSCore.Model.WallFaceAssembly | HSCore.Model.Content>;

  constructor(
    hostFace: HSCore.Model.WallFace,
    units: Array<HSCore.Model.WallFaceAssembly | HSCore.Model.Content>
  ) {
    super();
    this._hostFace = hostFace;
    this._units = units;
  }

  onCommit(): HSCore.Model.WallFaceAssembly {
    const contents: HSCore.Model.Content[] = [];
    const api = new HSCore.Model.WallFaceAssemblyApi();

    this._units.forEach((unit) => {
      if (unit instanceof HSCore.Model.WallFaceAssembly) {
        contents.push(...unit.associatedContents);
        api.removeWallFaceAssembly(unit);
      } else {
        contents.push(unit);
      }
    });

    const params: WallFaceAssemblyRequestParams = {
      id: 'none',
      name: ResourceManager.getString('plugin_wallface_assembly_leftmenu_group_all'),
      productType: HSCatalog.ProductTypeEnum.Assembly,
      contentType: HSCatalog.ContentTypeEnum.WallFaceAssembly
    };

    const spaceAssembly = HSCatalog.SpaceAssembly.create(params);
    const wallFaceAssembly = api.addWallFaceAssembly(
      spaceAssembly,
      this._hostFace,
      contents
    );

    super.onCommit([]);

    return wallFaceAssembly;
  }

  canTransactField(): boolean {
    return true;
  }
}