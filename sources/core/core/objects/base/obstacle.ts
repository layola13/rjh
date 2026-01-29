import { CustomizedModel_IO, CustomizedModel } from './CustomizedModel';
import { Entity } from './Entity';
import { MoldingTypeEnum } from './MoldingTypeEnum';
import { Material } from './Material';
import { Util } from '../utils/Util';
import { Signal } from './Signal';
import { EntityField } from './EntityField';
import { Logger } from './Logger';

export class Obstacle_IO extends CustomizedModel_IO {
  dump(
    entity: Obstacle,
    dumpContext?: unknown,
    deepClone: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    const obstacle = entity;
    obstacle.__responsiveHeight =
      activeDocument.global_wall_height3d === entity.ZLength;

    let dumpResult = super.dump(entity, undefined, deepClone, options);
    const mainData = dumpResult[0] as any;

    if (entity.responsiveHeight) {
      mainData.responsiveHeight = entity.responsiveHeight;
    }

    mainData.wallMoldings = {};

    obstacle._moldings.forEach((molding, moldingType) => {
      if (molding) {
        try {
          if (deepClone || this.mustDeepClone(molding.id)) {
            dumpResult = dumpResult.concat(molding.dump(dumpContext, deepClone, options));
          }
          mainData.wallMoldings[molding.type] = molding.id;
        } catch (error) {
          log.error(
            `${entity.tag}: exception occurs while dumping ${molding.tag}`,
            'HSCore.Dump.Error'
          );
        }
      }
    });

    return dumpResult;
  }

  load(entity: Obstacle, data: any, loadContext: unknown): void {
    super.load(entity, data, loadContext);

    const obstacle = entity;

    if (data.responsiveHeight) {
      obstacle.__responsiveHeight = data.responsiveHeight;
    }

    if (data.wallMoldings) {
      for (const moldingType in data.wallMoldings) {
        const moldingId = data.wallMoldings[moldingType];
        const molding = Entity.loadFromDumpById(moldingId, loadContext);
        if (molding) {
          obstacle._moldings.set(moldingType, molding);
          obstacle._setMoldingToWebCadDocument(molding, moldingType);
        }
      }
    }
  }
}

const MOLDING_TYPES: MoldingTypeEnum[] = [
  MoldingTypeEnum.Baseboard,
  MoldingTypeEnum.Cornice
];

export class Obstacle extends CustomizedModel {
  @EntityField()
  responsiveHeight: boolean = true;

  _moldings: Map<string, any> = new Map();
  signalMoldingChanged: Signal<any> | undefined = new Signal(this);
  __responsiveHeight?: boolean;

  constructor(id: string = '', contentType: unknown = undefined) {
    super(id, contentType);
  }

  destroy(): void {
    if (!this._disposed) {
      if (this.signalMoldingChanged) {
        this.signalMoldingChanged.dispose();
      }
      this.signalMoldingChanged = undefined;
      super.destroy();
    }
  }

  magicFlippingSetting(): [boolean, boolean, boolean] {
    if (this instanceof HSCore.Model.Flue || this instanceof HSCore.Model.Column) {
      return [true, false, false];
    } else if (this instanceof HSCore.Model.SewerPipe) {
      return this.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SewerPipeRound)
        ? [true, false, false]
        : [true, true, false];
    } else {
      return [false, false, false];
    }
  }

  getParentRoom(): any | undefined {
    let parentRoom: any | undefined;
    HSCore.Doc.getDocManager().activeDocument.forEachRoom((room: any) => {
      if (this.isContentInRoom(room)) {
        parentRoom = room;
      }
    });
    return parentRoom;
  }

  getIO(): Obstacle_IO {
    return Obstacle_IO.instance();
  }

  getMolding(moldingType: string): any | undefined {
    return this._moldings.get(moldingType);
  }

  _removeMoldingFromWebCadDocument(moldingType: string): void {
    if (this.webCADDocument) {
      for (const childKey in this.webCADDocument.children) {
        const child = this.webCADDocument.children[childKey];
        if (child.Class === 'HswMoldingDocument') {
          let contentType = child.customData.profileData.contentType;
          if (contentType && typeof contentType === 'string') {
            contentType = new HSCatalog.ContentType(contentType);
          }
          if (contentType?._types.find((type: string) => type === moldingType)) {
            this.webCADDocument = WebCADModelAPI.removeChildDocument(
              this.webCADDocument,
              this.webCADDocument.children[childKey]
            );
          }
        }
      }
    } else {
      Logger.console.error(`webCADDocument of obstacle ${this.id} is undefined`);
    }
  }

  _getWebCadDocumentFacePath(moldingType: string): THREE.Vector3[] {
    if (!this.webCADDocument) {
      Logger.console.error(`webCADDocument of obstacle ${this.id} is undefined`);
      return [];
    }

    let vertices: number[][];
    let result: THREE.Vector3[];

    if (moldingType === MoldingTypeEnum.Baseboard) {
      vertices = this.webCADDocument.vertices.filter((v: number[]) => v[2] === 0);
    } else {
      vertices = this.webCADDocument.vertices.filter((v: number[]) => v[2] > 0);
    }

    if (
      this.contentType.isTypeOf([
        HSCatalog.ContentTypeEnum.Flue,
        HSCatalog.ContentTypeEnum.SewerPipeSquare,
        HSCatalog.ContentTypeEnum.Riser
      ])
    ) {
      let maxX = vertices[0][0];
      vertices.forEach((vertex) => {
        if (Math.abs(vertex[0]) > maxX) {
          maxX = Math.abs(vertex[0]);
        }
      });
      maxX = Math.floor(maxX / HSCore.Util.Math.defaultTolerance);
      vertices = vertices.filter((vertex) =>
        HSCore.Util.Math.nearlyEquals(
          Math.floor(Math.abs(vertex[0]) / HSCore.Util.Math.defaultTolerance),
          maxX
        )
      );
    } else if (this.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SewerPipeRound)) {
      let maxLengthSq = 0;
      vertices.forEach((vertex) => {
        const lengthSq = new THREE.Vector2(vertex[0], vertex[1]).lengthSq();
        maxLengthSq = Math.max(lengthSq, maxLengthSq);
      });
      vertices = vertices.filter((vertex) =>
        HSCore.Util.Math.nearlyEquals(
          maxLengthSq,
          new THREE.Vector2(vertex[0], vertex[1]).lengthSq()
        )
      );
    }

    if (
      this.contentType.isTypeOf([
        HSCatalog.ContentTypeEnum.SewerPipeRound,
        HSCatalog.ContentTypeEnum.ColumnDiyRound
      ])
    ) {
      result = vertices
        .sort((a, b) => {
          const origin = { x: 0, y: 0 };
          return HSCore.Util.Math.lineLineAngleCCW(
            origin,
            { x: b[0], y: b[1] },
            origin,
            { x: a[0], y: a[1] }
          );
        })
        .map((v) => new THREE.Vector3(v[0], v[1], v[2]));
    } else {
      result = vertices
        .sort((a, b) => {
          if (a[0] < 0 && a[1] > 0) {
            return true;
          }
          if (!(b[0] < 0 && b[1] > 0) && a[0] + a[1] < b[0] + b[1]) {
            return true;
          }
          return false;
        })
        .map((v) => new THREE.Vector3(v[0], v[1], v[2]));
    }

    result.push(result[0]);
    return result;
  }

  _setMoldingToWebCadDocument(molding: any, moldingType: string): void {
    if (this.webCADDocument) {
      this._createNewMetadataForWebDocumentChange();
      this._removeMoldingFromWebCadDocument(moldingType);

      if (molding) {
        const profileData = {
          seekId: molding.seekId,
          contentType: molding.contentType,
          profile: molding.profile,
          profileSizeX: molding.XSize,
          profileSizeY: molding.YSize
        };

        const facePath = this._getWebCadDocumentFacePath(moldingType);
        const materialData = Util.getDIYMaterialDataFromMaterialEntity(molding.material);
        const moldingConfig = {
          data: profileData,
          materialData,
          normalTextureUrl: materialData.normalTexture,
          textureUrl: materialData.textureURI
        };

        const flippingSettings = this.magicFlippingSetting();
        this.webCADDocument = WebCADModelAPI.addMolding(
          this.webCADDocument,
          facePath,
          facePath,
          moldingConfig,
          flippingSettings[0],
          flippingSettings[1],
          flippingSettings[2]
        );
      }

      HSCore.Util.CustomizedModel.syncChildrenByWebCADDocument(this);
    } else {
      Logger.console.error(`webCADDocument of obstacle ${this.id} is undefined`);
    }
  }

  setMolding(molding: any, moldingType: string): void {
    const oldMolding = this._moldings.get(moldingType);
    oldMolding?.assignTo(null);
    molding?.assignTo(this);

    this._setMoldingToWebCadDocument(molding, moldingType);

    if (molding) {
      this._moldings.set(moldingType, molding);
    } else {
      this._moldings.delete(moldingType);
    }

    this.signalMoldingChanged?.dispatch({
      moldingEnum: moldingType,
      oldMolding,
      newMolding: molding
    });

    this.dirty();
  }

  forEachMolding(callback: (molding: any, moldingType: string) => void): void {
    if (callback) {
      this._moldings.forEach((molding, moldingType) => callback(molding, moldingType));
    }
  }

  setHeight(height: number): void {
    this.applyLengths(this.XSize, this.YSize, height);
  }

  updateHeight(height: number): void {
    this.applyLengths(this.XSize, this.YSize, height);
    this.responsiveHeight = false;
  }

  traverseMoldingGraphicsData(callback: (faceData: any, index: number) => void): void {
    const graphicsData = this._graphicsData || this.getGraphicsData();
    graphicsData.faces.forEach((faceData: any, index: number) => {
      if (this.isMoldingData(faceData)) {
        callback(faceData, index);
      }
    });
  }

  traverseBodyGraphicsData(callback: (faceData: any, index: number) => void): void {
    const graphicsData = this._graphicsData || this.getGraphicsData();
    graphicsData.faces.forEach((faceData: any, index: number) => {
      if (!this.isMoldingData(faceData)) {
        callback(faceData, index);
      }
    });
  }

  getGraphicsData(): any {
    super.getGraphicsData();

    MOLDING_TYPES.forEach((moldingType) => {
      const molding = this.getMolding(moldingType);
      if (!molding) return;

      const perimeter = this._calculateMoldingPerimeter(molding);
      if (!GeLib.MathUtils.larger(perimeter, 0)) {
        Logger.console.assert(false, `${molding?.tag ?? 'Molding'} invalid.`);
        return;
      }

      const material = molding?.getMaterial();
      const materialData = material ? material.dump()[0] : undefined;

      if (materialData) {
        materialData.normalTexture = molding.normalTexture;
        materialData.tileSize_x = perimeter;
        materialData.tileSize_y = perimeter;
      }

      this._graphicsData.faces.forEach((faceData: any) => {
        if (
          this.isMoldingData(faceData) &&
          this.isMoldingType(faceData, moldingType) &&
          faceData.customData
        ) {
          faceData.customData.fpMaterialData = materialData;
        }
      });
    });

    return this._graphicsData;
  }

  _calculateMoldingPerimeter(molding: any): number {
    const profilePoints = HSCore.Util.ProfileParser.parse(molding.profile);
    profilePoints.forEach((point: any) => {
      point.x = point.x * molding.XLength;
      point.y = point.y * molding.YLength;
    });

    let perimeter = 0;
    for (let i = 1; i < profilePoints.length; ++i) {
      perimeter += new THREE.Vector2()
        .subVectors(profilePoints[i - 1], profilePoints[i])
        .length();
    }
    return perimeter;
  }

  setMaterialData(materialDataList: [string, any][]): void {
    if (this.webCADDocument) {
      MOLDING_TYPES.forEach((moldingType) => {
        const molding = this.getMolding(moldingType);
        if (molding === undefined) return;

        for (const childKey in this.webCADDocument.children) {
          const child = this.webCADDocument.children[childKey];
          if (child.Class !== 'HswMoldingDocument') continue;
          if (!child.customData.profileData.contentType._types.find((type: string) => type === moldingType)) {
            continue;
          }

          const pathPrefix = `${this.webCADDocument.docId}/${child.docId}/`;
          for (const materialEntry of materialDataList) {
            if (!materialEntry[0].startsWith(pathPrefix)) continue;

            let material = molding.getMaterial();
            if (material === undefined) {
              material = new Material();
              material.set(materialEntry[1]);
              molding.setMaterial(material);
            } else {
              material.set(materialEntry[1]);
            }
            break;
          }
        }
      });

      super.setMaterialData(materialDataList);
    } else {
      Logger.console.error(`webCADDocument of obstacle ${this.id} is undefined`);
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.NgObstacle, Obstacle);