        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const thickness: any;
    export const bottomFaceMaterial: any;
    export const dumpedEntities: any;
    export const doorStoneMaterialEnabled: any;
    export const _isDoorStoneMaterialEnabled: any;
    export const __thickness: any;
    export const __doorStoneMaterialEnabled: any;
    export const _bottomFaceMaterial: any;
    // Original Name: C
    export class DOpening extends import("16481").DAssembly {
        constructor(module: any, exports: any, ...args: any[]);
        _initFaceSets(): any;
        build(): any;
        updateMixPaintAndAlignFaces(): any;
        _setThickness(module: any): any;
        _onDoorStoneMaterialStatusChanged(): any;
        supportPM(): any;
        getPocket(): any;
        getBottomFace(): any;
        _setHost(module: any): any;
        onHostChanged(): any;
        getBottomFaces(): any;
        updateHostFace(): any;
        exports: any;
    }
    export const signalValidityChanged: any;
    export const _materialSignalHook: any;
    export const __profile: any;
    export const __frontProfile: any;
    export const __archHeight: any;
    export const __isDefaultAlign: any;
    export const _faces: any;
    export const _pocketXSize: any;
    export const _pocketYSize: any;
    export const masterId: any;
    export const id: any;
    export const hostFace: any;
    export const type: any;
    export const loading: any;
    export const outerWallSide: any;
    export const left: any;
    export const material: any;
    export const sideFaces: any;
    export const x: any;
    export const y: any;
    export const cutPath: any;
    export const __XLength: any;
}

declare module "71153" {
    export const length: any;
    export const SpaceAssembly: any;
    export const SpaceAssembly_IO: any;
    // Original Name: c
    export class SpaceAssembly_IO extends import("24567").Entity_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const seekId: any;
    export const associatedIds: any;
    export const productsMap: any;
    // Original Name: d
    export class SpaceAssembly extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any): any;
        initByMeta(module: any): any;
        refreshBoundInternal(): any;
        _updateContents(module: any): any;
        onContentsFieldChanged(module: any): any;
        _refreshSizeAndPosition(): any;
        getIO(): any;
    }
    export const _position: any;
    export const _size: any;
    export const _watchedFiledName: any;
    export const _seekId: any;
    export const _associatedIds: any;
    export const _originalSpaceBox3: any;
    export const _associatedContents: any;
    export const associatedContents: any;
    export const _signalHook: any;
    export const _metadata: any;
    export const boundInternal: any;
}

declare module "71154" {
    export const exports: any;
}

declare module "71344" {
    export const RenderOptions: any;
    // Original Name: r
    export class RenderOptions {
        constructor(...args: any[]);
        setCurrentTemplate(module: any, exports: any, require: any, i: any): any;
        setTemplateCache(module: any): any;
        clearTemplateCache(): any;
        setDomeLight(module: any, exports: any, require: any, i: any): any;
        resetDomeLight(): any;
        setCurrentGroup(module: any): any;
        disableTemplate(): any;
        enableTemplate(): any;
        setSeniorParams(module: any): any;
        reset(): any;
        verify(module: any): any;
        dump(): any;
        load(module: any): any;
    }
    export const _templateRenderBinding: any;
    export const _templateName: any;
    export const _templateIntelligent: any;
    export const _templateEnabled: any;
    export const _templateIsNight: any;
    export const _currentGroup: any;
    export const _seniorParams: any;
    export const _domeLightData: any;
    export const _templateCache: any;
    export const brightness: any;
    export const reflection: any;
    export const toneIndex: any;
    export const toneTemperature: any;
    export const currentTemplate: any;
    export const name: any;
    export const intelligent: any;
    export const enable: any;
    export const currentGroup: any;
    export const domeLight: any;
    export const seniorParams: any;
    export const AlternateTemplateName: any;
}

declare module "71373" {
    export const IntelligentLightsUtil: any;
    export const LightSetConfig: any;
    export const SunlightUtil: any;
    export const DefaultSunlightOptions: any;
    export const ChangeableDefaultSunlightParams: any;
    export const ExportLights: any;
    export const getAutoSunLightAngles: any;
    export const IParsedFgiResult: any;
    export const FgiParser: any;
    export const Util: any;
    export const ExportSceneData: any;
}

declare module "71518" {
    export const ExtraordinarySketchBase: any;
    // Original Name: r
    export class ExtraordinarySketchBase extends import("25641").InteractiveModel {
        constructor(module: any, ...args: any[]);
        generateId(): any;
        forceSetId(module: any): any;
    }
    export const _id: any;
}

declare module "71569" {
    export const Params: any;
    export const sunlight: any;
    export const autoPosition: any;
    export const temperature: any;
    export const intensity: any;
    export const intensityFactor: any;
    export const sizeMultiplier: any;
    export const sizeMultiplierFactor: any;
    export const volumeLight: any;
    export const heightAngle: any;
    export const horizontalAngle: any;
}

declare module "71763" {
    export const exports: any;
}

declare module "71879" {
    export const NCustomizedFlue: any;
    export const NCustomizedFlue_IO: any;
    // Original Name: a
    export class NCustomizedFlue_IO extends import("73858").NCustomizedStructre_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: s
    export class NCustomizedFlue extends import("73858").NCustomizedStructure {
        constructor(module: any, ...args: any[]);
        initByMeta(module: any): any;
        setStructureMode(module: any): any;
        calcProfile(module: any): any;
        newSelf(): any;
        getIO(): any;
    }
    export const structureMode: any;
    export const ZLength: any;
    export const XSize: any;
    export const userData: any;
    export const YSize: any;
    export const length: any;
}

declare module "71881" {
    export const exports: any;
}

declare module "72132" {
    export const length: any;
    export const Content_IO: any;
    export const ContentFlagEnum: any;
    export const Content: any;
    // Original Name: d
    export class Content_IO extends import("99338").Entity_IO {
        load(module: any, exports: any, require: any): any;
    }
    export const seekId: any;
    export const __variationId: any;
    export const variationId: any;
    export const __x: any;
    export const __y: any;
    export const __z: any;
    export const __XRotation: any;
    export const XRotation: any;
    export const __YRotation: any;
    export const YRotation: any;
    export const __ZRotation: any;
    export const ZRotation: any;
    export const __XScale: any;
    export const XScale: any;
    export const __YScale: any;
    export const YScale: any;
    export const __ZScale: any;
    export const ZScale: any;
    export const __isScalable: any;
    export const __flip: any;
    export const flip: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __ZLength: any;
    export const topView: any;
    export const modelTexture: any;
    export const model3d: any;
    export const poseData: any;
    // Original Name: h
    export class Content extends import("99338").Entity {
        constructor(module: any, ...args: any[]);
        verify(): any;
        destroy(): any;
        migrateContentMetaData(module: any): any;
        updateContentMetaData(module: any): any;
        initByMeta(module: any, exports: any, require: any, i: any): any;
        getMetadataFilterKeys(): any;
        isComponentAvailable(module: any): any;
        getNormalizedComponentName(module: any): any;
        getComponentStorageKey(module: any): any;
        getComponentByStorageKey(module: any): any;
        getMaterial(module: any): any;
        _setMaterialsMap(module: any): any;
        getMaterialList(): any;
        flipSelf(): any;
        getIO(): any;
        dealMeta(module: any, exports: any): any;
        migrateMetadata(module: any, exports: any): any;
        assignTo(module: any): any;
        getHost(): any;
        _setHost(module: any): any;
        isValidHost(module: any): any;
        addContent(module: any): any;
        canAddContent(module: any): any;
        removeContent(module: any): any;
        hasContent(module: any, exports: any): any;
        _setContents(module: any): any;
        _addContent(module: any): any;
        _removeContent(module: any): any;
        forEachContent(module: any, exports: any): any;
        modelBoundLine(module: any): any;
        forEachMaterial(module: any, exports: any): any;
        isContentValid(): any;
        getAnimationByType(module: any, exports: any): any;
    }
    export const _seekId: any;
    export const _metadata: any;
    export const _materialByComponent: any;
    export const _host: any;
    export const __contents: any;
    export const outline: any;
    export const signalMaterialChanged: any;
    export const _meshMaterials: any;
    export const contentType: any;
    export const metadata: any;
    export const XLength: any;
    export const YLength: any;
    export const ZLength: any;
    export const _disposed: any;
    export const defaultHeight: any;
    export const id: any;
    export const data: any;
    export const productsMap: any;
    export const host: any;
    export const contents: any;
    export const hasContent: any;
    export const x: any;
    export const y: any;
    export const type: any;
}

declare module "72517" {
    export const NCustomizedFeatureModelUtil: any;
    // Original Name: s
    export class NCustomizedFeatureModelUtil {
        getContinousFaceItemByLightSlot(module: any, exports: any): any;
        getContinousLightSlotItemsByRelyerFace(module: any, exports: any, require: any): any;
        map(): any;
        constructor(...args: any[]);
    }
    export const Class: any;
    export const eId: any;
    export const tag: any;
    export const regions: any;
    export const children: any;
    export const length: any;
    export const parent: any;
}

declare module "72537" {
    export const Window: any;
    // Original Name: r
    export class Window extends import("94331").ParametricModel {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        onUpdate(): any;
    }
    export const z: any;
    export const y: any;
    export const equalparts: any;
    export const affectedFixedHeight: any;
    export const x: any;
    export const heightFixed: any;
    export const length: any;
    export const affectedFixedWidth: any;
    export const widthFixed: any;
    export const customData: any;
    export const diffuseMapUvTransform: any;
    export const normalMapUvTransform: any;
    export const opacity: any;
    export const entityId: any;
    export const roomType: any;
}

declare module "7263" {
    export const exports: any;
}

declare module "72664" {
    export const EntityTxnState: any;
    // Original Name: d
    export class EntityTxnState {
        constructor(module: any, exports: any, ...args: any[]);
        _getEntityFromContext(module: any, exports: any): any;
        transact(module: any, exports: any, require: any, n: any): any;
        commit(module: any): any;
        restore(module: any, exports: any, require: any): any;
        preLoadEntity(module: any, exports: any, require: any): any;
        postRestore(module: any, exports: any): any;
        _dumpFieldValue(module: any, exports: any, require: any): any;
        _dumpEntity(module: any, exports: any, require: any, i: any): any;
        _restoreEntity(module: any, exports: any, require: any): any;
        _loadFieldValue(module: any, exports: any, require: any, i: any, n: any): any;
        getFieldValue(module: any, exports: any): any;
    }
    export const currentState: any;
    export const entity: any;
    export const type: any;
    export const lastType: any;
    export const Creation: any;
    export const Recycling: any;
    export const dataBefore: any;
    export const before: any;
    export const materialsData: any;
    export const id: any;
    export const fieldValueType: any;
    export const Deletion: any;
    export const after: any;
    export const dataAfter: any;
    export const undo: any;
    export const length: any;
}

declare module "72839" {
    export const exports: any;
}

declare module "73003" {
    export const RequestType: any;
}

declare module "73016" {
    export const exports: any;
}

declare module "73115" {
    export const exports: any;
    export const is: any;
}

declare module "73133" {
    export const exports: any;
}

declare module "73196" {
    export const MixPaintDecorator: any;
    export const mixpaint: any;
    export const isGussetFreeRegion: any;
    export const mixPave: any;
    export const length: any;
}

declare module "7325" {
    export const length: any;
    export const ParametricOpening: any;
    export const ParametricOpening_IO: any;
    export const onParamsChangedCallback: any;
    // Original Name: F
    export class ParametricOpening_IO extends import("52881").NCustomizedFeatureModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
    }
    export const uuid: any;
    export const eId: any;
    export const wallParam: any;
    export const initProperties: any;
    export const relatedWallIds: any;
    export const isSplitFace: any;
    export const aFaceMaterialSwitch: any;
    export const bFaceMaterialSwitch: any;
    export const metaInfo: any;
    export const metaInfoDump: any;
    export const hostRoofFaceId: any;
    export const z: any;
    export const relatedWalls: any;
    export const dependentMetaDates: any;
    export const subpartMetaDates: any;
    // Original Name: R
    export class ParametricOpening extends import("52881").NCustomizedFeatureModel {
        constructor(module: any, exports: any, ...args: any[]);
        getCorniceCutterInfo(module: any): any;
        getPocketLength(): any;
        getBaseboardCutterInfo(module: any): any;
    }
    export const storeProperty: any;
    export const _isInited: any;
    export const _useDefaultSize: any;
    export const _diff: any;
    export const _union: any;
    export const _breps: any;
    export const signalBrepChanged: any;
    export const signalValidityChanged: any;
    export const _wallType: any;
    export const _boundingBox3D: any;
    export const XLength: any;
    export const cutPath: any;
    export const contentType: any;
    export const g: any;
    export const defaultHeight: any;
    export const metadata: any;
    export const sizeRangeType: any;
    export const _topProjection: any;
    export const parent: any;
    export const host: any;
    export const x: any;
    export const y: any;
    export const rotation: any;
    export const originKey: any;
    export const masterId: any;
    export const id: any;
    export const __ZRotation: any;
    export const _graphicsData: any;
    export const size: any;
    export const _data: any;
    export const _sdkModel: any;
    export const brepShells: any;
    export const breps: any;
    export const _defaultWallPath: any;
    export const _childrenParts: any;
    export const propertyTree: any;
    export const YLength: any;
    export const ZLength: any;
    export const _hostRoofFaceId: any;
    export const _host: any;
    export const _hostFace: any;
    export const angle: any;
    export const chordHeight: any;
    export const calcGrip: any;
    export const isSubPart: any;
    export const name: any;
    export const friendlyName: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const surface: any;
    export const variationId: any;
    export const seekId: any;
    export const pats: any;
    export const mixpaint: any;
    export const mixPave: any;
    export const material: any;
    export const tag: any;
    export const _defaultOldVersionMaterialDataSet: any;
    export const moldingId: any;
    export const parameters: any;
    export const contentTypeStr: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const innerLoops: any;
    export const dimensionInfos: any;
    export const gripInfos: any;
    export const lines: any;
    export const outerLoops: any;
    export const innerPath: any;
    export const wallCurves: any;
    export const walls: any;
    export const glass: any;
    export const w: any;
    export const outerLoop: any;
    export const outer: any;
    export const outerPath: any;
    export const width: any;
    export const type: any;
}

declare module "73343" {
    export const exports: any;
}

declare module "73367" {
    export const length: any;
    export const Block: any;
    export const GroovingChamferData: any;
    export class c extends import("24567").Entity_IO {
        instance(): any;
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const _Block_IO_instance: any;
    export const XLength: any;
    export const YLength: any;
    export const Rotation: any;
    export const Outline: any;
    export const Origin: any;
    export const material: any;
    export const brickPatternOption: any;
    export const propertiesInfos: any;
    export const localId: any;
    export const groupId: any;
    export const groupInfo: any;
    export const materialSmall4Rot: any;
    export const groovingChamferData: any;
    export const customizedTextureURIs: any;
    export const __XLength: any;
    export const __YLength: any;
    export const __Rotation: any;
    export const invalidIds: any;
    export const metadata: any;
    export const edgesChamferInfo: any;
    export const digest: any;
    export const offsetX: any;
    export const Line: any;
    export const Arch: any;
    export const VType: any;
    export const UType: any;
    // Original Name: u
    export class GroovingChamferData {
        constructor(...args: any[]);
        populate(module: any): any;
        reset(module: any): any;
        isSame(module: any): any;
        equals(module: any): any;
        isValid(): any;
        getHashCode(): any;
    }
    export const chamferPath: any;
    export const chamferWidth: any;
    export const chamferType: any;
    export const vGroovingCount: any;
    export const hGroovingCount: any;
    export const groovingWidth: any;
    export const vGroovingAngle: any;
    export const hGroovingAngle: any;
    export const groovingType: any;
    export const customizedTextureURI: any;
    // Original Name: g
    export class Block extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any): any;
        _setOutline(module: any): any;
        _setOrigin(module: any): any;
        generateHashString(): any;
        getIO(): any;
        addProperties(module: any): any;
        addGroups(module: any, exports: any): any;
        getOutline(): any;
        getPaintOutline(): any;
        getOrigin(): any;
        _getClosedPath(module: any): any;
        _getPaintPath(module: any): any;
        bounding(): any;
        updateMaterial(module: any): any;
        getMaterial(): any;
        getImageUrl(): any;
        resetGroovingChamfer(module: any): any;
        getRefCustomizedTextureURI(module: any): any;
        setRefCustomizedTextureURI(module: any, exports: any): any;
        isGroovingChamferValid(): any;
        isUvTransformd(): any;
        isUvTransformed(): any;
        setUvTransform(module: any): any;
        resetUvTransform(): any;
        isSameUvTransform(module: any): any;
        getBlockData(): any;
        getGroovingChamferHashCode(): any;
        copyTileProcessData(module: any): any;
        onFieldChanged(module: any, exports: any, require: any): any;
    }
    export const __Outline: any;
    export const __Origin: any;
    export const signalFieldChanged: any;
    export const _material: any;
    export const _groovingChamferData: any;
    export const _customizedTextureURIMap: any;
    export const name: any;
    export const __value: any;
    export const properties: any;
    export const normalTexture: any;
}

declare module "73400" {
    export const race: any;
    export const error: any;
}

declare module "73441" {
    export const DoorStoneMixpaintUtil: any;
    export const OVERLAP: any;
    export const length: any;
}

declare module "73483" {
    export const WallBoardBaseboard: any;
    // Original Name: a
    export class WallBoardBaseboard extends import("8302").WallMolding {
        constructor(module: any, exports: any, ...args: any[]);
        clone(): any;
    }
    export const wallBoardBaseboardPath: any;
    export const type: any;
}

declare module "73592" {
    export const SweeperConnectHelper: any;
    // Original Name: n
    export class SweeperConnectHelper {
        findRelatedMoldings(module: any, exports: any, require: any): any;
        findRelatedLightSlots(module: any, exports: any, require: any): any;
        findRelatedLightBands(module: any, exports: any, require: any): any;
        findRelatedSweepers(module: any, exports: any, require: any): any;
        findOverlapSweepers(module: any, exports: any): any;
        findSweepConnectedSweepers(module: any, exports: any, require: any): any;
        judgeContinousSweep(module: any, exports: any): any;
        findConnectedCoedges(module: any, exports: any): any;
        require: any;
        constructor(...args: any[]);
    }
    export const overlaped: any;
    export const length: any;
    export const connect: any;
    export const tag: any;
    export const _instance: any;
}

declare module "73660" {
    export const FlatLight_IO: any;
    export const FlatLight: any;
    // Original Name: a
    export class FlatLight_IO extends import("5543").VirtualAreaLight_IO {
        postLoad(module: any, exports: any): any;
    }
    export const intensity: any;
    // Original Name: s
    export class FlatLight extends import("5543").VirtualAreaLight {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        reset(): any;
        getIO(): any;
        getArea(): any;
        constructPath(module: any): any;
    }
    export const type: any;
    export const width: any;
    export const height: any;
}

declare module "73751" {
    export const length: any;
    export const SunPath: any;
    // Original Name: a
    export class SunPath extends import("24567").Entity {
        constructor(module: any, exports: any, ...args: any[]);
        create(module: any, exports: any): any;
        getTargetRadius(): any;
        getSunOrbitRadius(): any;
        relocateSunPos(): any;
        clearOffset(): any;
        getCenter(): any;
        updateRoomInfo(module: any): any;
    }
    export const verticalAngle: any;
    export const horizontalAngle: any;
    export const targetOffsetX: any;
    export const targetOffsetY: any;
    export const sunPosX: any;
    export const sunPosY: any;
    export const _roomCenter: any;
    export const _radius: any;
    export const _targetMaxRadius: any;
}

declare module "7380" {
    export const exports: any;
}

declare module "73858" {
    export enum StructureFlagEnum {
        dragOn = 32768,
    }
    export const length: any;
    export const NCustomizedStructure: any;
    export const StructureFaceType: any;
    export const StructureMode: any;
    export const NCustomizedStructre_IO: any;
    // Original Name: g
    export class NCustomizedStructre_IO extends import("20551").Content_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    export const structureMode: any;
    export const syncHeight: any;
    export const fIds: any;
    export const wallpart: any;
    export const independent: any;
    export const hoverOn: any;
    export const dragOn: any;
    export const left: any;
    export const right: any;
    export const top: any;
    export const bottom: any;
    export const front: any;
    export const back: any;
    export const circle: any;
    // Original Name: y
    export class NCustomizedStructure extends import("20551").Content {
        constructor(module: any, ...args: any[]);
        onFieldChanged(module: any, exports: any, require: any): any;
        return: any;
    }
    export const __faceIds: any;
    export const faceIds: any;
    export const isAux: any;
    export const id: any;
    export const userData: any;
    export const z: any;
    export const XSize: any;
    export const discreteCount: any;
    export const brepcache: any;
    export const tag: any;
    export const x: any;
    export const y: any;
    export const errorStr: any;
    export const addShells: any;
    export const ZLength: any;
    export const IN: any;
    export const type: any;
    export const rotation: any;
    export const XLength: any;
    export const YLength: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const XRotation: any;
    export const YRotation: any;
    export const ZRotation: any;
    export const prototype: any;
}

declare module "73961" {
    export const IPropertyPanelData: any;
    export const IInputData: any;
    export const EN_PROPERTY_PANEL_ITEM_TYPE: any;
    export const NCustomizedParametricCeiling: any;
    export const NCustomizedParametricCeiling_IO: any;
    export const onParamsChangedCallback: any;
    // Original Name: u
    export class NCustomizedParametricCeiling_IO extends import("78283").NCustomizedParametricModel_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
    }
    // Original Name: g
    export class NCustomizedParametricCeiling extends import("78283").NCustomizedParametricModel {
        constructor(module: any, exports: any, ...args: any[]);
        getParameters(): any;
        initByParameters(module: any, exports: any): any;
        initByMeta(module: any, exports: any, require: any): any;
        getRoomLoop(module: any): any;
        initCeiling(module: any, exports: any): any;
        initModelDocument(module: any, exports: any, require: any): any;
        initCeilingDocument(module: any, exports: any, require: any): any;
        generatePropertyPanelDatas(module: any): any;
        setRotation(module: any): any;
        getModelData(module: any): any;
        updatePositionFromMeta(module: any, exports: any): any;
        isBottomFace(module: any): any;
        getGraphicsOption(module: any, exports: any): any;
        getFaceProjectionPlane(module: any, exports: any): any;
    }
    export const parameters: any;
    export const selfHostLightSlots: any;
    export const selfHostMoldings: any;
    export const parametricCeilingType: any;
    export const isRectMainPart: any;
    export const minSizeLimited: any;
    export const moldings: any;
    export const x: any;
    export const y: any;
    export const z: any;
    export const parametricMeta: any;
    export const roomHeight: any;
    export const uuid: any;
    export const roomLoop: any;
    export const XScale: any;
    export const YScale: any;
    export const ZScale: any;
    export const rotation: any;
    export const isCeiling: any;
}

declare module "74007" {
    export const length: any;
    export const Floor_IO: any;
    export const RoomSurfaceTypeEnum: any;
    export const RoomFlagEnum: any;
    export const Floor: any;
    export const ceilingOff: any;
    export const hoverOn: any;
    export const clickOn: any;
    export const dimensionOff: any;
    export const roomtypeOff: any;
    export const floor: any;
    export const ceiling: any;
    // Original Name: d
    export class Floor_IO extends import("17808").Face_IO {
        load(module: any, exports: any, require: any, i: any): any;
    }
    export const data: any;
    export const generated: any;
    export const seekId: any;
    export const __roomType: any;
    export const __roomTypeDisplayName: any;
    // Original Name: h
    export class Floor extends import("17808").Face {
        constructor(module: any, ...args: any[]);
        getIO(): any;
        forEachSurface(module: any, exports: any): any;
    }
}

declare module "74098" {
    export const FaceGroupUtil: any;
    // Original Name: a
    export class FaceGroupUtil {
        isFaceGroup(module: any): any;
        isFaceGroupMixpaint(module: any): any;
        getGroupFaces(module: any): any;
        faceGroupNeedClearRCP(module: any): any;
        getFaceGroupTransform(module: any): any;
        getFaceGroupTransformMixpaint(module: any, exports: any): any;
        getPaveOutline(module: any, exports: any): any;
        constructor(...args: any[]);
    }
}

declare module "74106" {
    export const FieldValueWrapper: any;
    // Original Name: a
    export class FieldValueWrapper {
        constructor(module: any, exports: any, ...args: any[]);
        dumpValue(module: any, exports: any, require: any): any;
        loadValue(module: any, exports: any): any;
        _loadEntity(module: any, exports: any, require: any, r: any): any;
    }
    export const type: any;
    export const value: any;
    export const MaterialData: any;
    export const State: any;
}

declare module "7418" {
    export const length: any;
    export const MeshLight_IO: any;
    export const MeshLight: any;
    // Original Name: d
    export class MeshLight_IO extends import("3577").Light_IO {
        dump(module: any, exports: any, require: any, i: any): any;
        load(module: any, exports: any, require: any): any;
        postLoad(module: any, exports: any): any;
    }
    export const contentID: any;
    export const paths: any;
    export const bandIndex: any;
    export const __contentID: any;
    export const x: any;
    export const __bandIndex: any;
    export const intensity: any;
    // Original Name: h
    export class MeshLight extends import("3577").Light {
        constructor(module: any, exports: any, ...args: any[]);
        create(): any;
        isVirtual(): any;
        hasAreaSize(): any;
        reset(): any;
        getIO(): any;
        refreshBoundInternal(): any;
        getHost(): any;
        getPaths(): any;
        getLength(): any;
        setRemoved(): any;
        updateByPaths(module: any): any;
        onPathsChanged(): any;
        setHostId(module: any, exports: any): any;
        destroy(): any;
        getRenderParameters(): any;
    }
    export const type: any;
    export const _pathsSignalHook: any;
    export const id: any;
    export const _disposed: any;
    export const temperature: any;
    export const entityId: any;
    export const close: any;
    export const rgb: any;
}

declare module "74305" {
    export const Pano: any;
    export const height3d: any;
    export const dis: any;
    export const x: any;
    export const y: any;
    export const XSize: any;
    export const length: any;
    export const outDoors: any;
    export const inDoors: any;
    export const roomId: any;
    export const roomType: any;
    export const roomName: any;
    export const roomTypeDisplayName: any;
    export const visiblePanos: any;
    export const connectors: any;
    export const ZLength: any;
    export const id: any;
}

declare module "74336" {
    export const HoleDataProvider: any;
    // Original Name: s
    export class HoleDataProvider extends import("67629").IDataProvider {
        constructor(module: any, ...args: any[]);
        getFacePath(module: any): any;
        _convertToWorldSpace(module: any): any;
        getTopOrBottomFacePath(module: any): any;
        getTopFaceGeometry(module: any): any;
        getBottomFaceGeometry(module: any): any;
        getSideFaceGeometry(module: any): any;
        _isSideFaceHiddenInSlab(module: any, exports: any): any;
    }
    export const entity: any;
    export const PI: any;
    export const ZLength: any;
    export const swing: any;
    export const x: any;
    export const y: any;
}

declare module "74386" {
    export const HoleTopoFace: any;
    export const WallTopoFace: any;
    export const SlabTopoFace: any;
    export const RoomTopoFace: any;
    export const TopoFace: any;
    // Original Name: r
    export class TopoFace {
        constructor(module: any, exports: any, ...args: any[]);
        clone(): any;
    }
    export const brepFace: any;
    export const topoName: any;
    // Original Name: a
    export class RoomTopoFace extends TopoFace {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        clone(): any;
    }
    export const linkWallIds: any;
    export const isAux: any;
    export const _groupIndex: any;
    export const isSameDirection: any;
    // Original Name: s
    export class HoleTopoFace extends TopoFace {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        isStrange(): any;
    }
    export const isBottom: any;
    export const mustExist: any;
    export const sourceIndex: any;
    export const StrangeSourceIndex: any;
}

declare module "746362" {
    export const g: any;
    export const LightContentGroup: any;
    export const LightContent: any;
    // Original Name: i
    export class intensity {
        constructor(module: any, exports: any, ...args: any[]);
        contentType(): any;
        getContents(): any;
        getCategories(): any;
        getHost(): any;
        accept(module: any, exports: any, i: any): any;
        getPosition(): any;
        getOutline(): any;
        getRotation(): any;
        getSize(): any;
        _calculateOutline(): any;
    }
    export const _contentType: any;
    export const _content: any;
    export const _position: any;
    export const _rotation: any;
    export const _size: any;
    export const _outline: any;
    export const metadata: any;
    export const _categories: any;
    export const rotation: any;
    export const _children: any;
    export const FgiParser: any;
    export const length: any;
    export const y: any;
    export const z: any;
    export const vertexPositions: any;
    export const vertexUVs: any;
    export const vertexNormals: any;
    export const faceIndices: any;
    export const seekId: any;
    export const normalTexture: any;
    export const type: any;
    export const modelComponent: any;
    export const modelJid: any;
    export const colorMode: any;
    export const jid: any;
    export const opacityMask: any;
    export const diffuseMapUvTransform: any;
    export const UVTransform: any;
    export const normalMapUvTransform: any;
    export const normalUVTransform: any;
    export const parentSeekId: any;
    export const parentJid: any;
    export const r: any;
    export const b: any;
    // Original Name: m
    export class ZRotation {
        constructor(module: any, ...args: any[]);
        parseFgiData(module: any): any;
        parse(): any;
        _fixClipBoxMesh(module: any, exports: any, require: any): any;
        _parse(module: any): any;
    }
    export const fgiData: any;
    export const context: any;
    export const err: any;
    export const bounding: any;
    export const position: any;
    export const localPosition: any;
    export const matrixWorld: any;
    export const x: any;
    export const clipInfo: any;
    export const clipBoxMesh: any;
    export const : any;
    export const const: any;
    export const this: any;
    export const matrixLocal: any;
    export const instancedArraysEnabled: any;
    export const Mesh: any;
    export const refPocketMaterial: any;
    export const contentType: any;
    export const roomArea: any;
    export const clipMeshes: any;
    export const uid: any;
    export const components: any;
    export const poseData: any;
    export const component: any;
    export const material: any;
    export const color: any;
    export const uv_override: any;
    export const pocketMaterial: any;
    export const customAttrs: any;
    export const pocketMaterialMap: any;
    export const instanceid: any;
    export const normaltexture: any;
    export const texture: any;
    export const entityId: any;
    export const ref: any;
    export const localpos: any;
    export const localrot: any;
    export const localscale: any;
    export const isDoor: any;
    export const pos: any;
    export const rot: any;
    export const scale: any;
    export const componentModifiers: any;
    export const break: any;
    export const nearestTemperature: any;
    // Original Name: n
    export class z extends import("22777").default {
        _compute(module: any, exports: any, require: any, i: any): any;
        _oneLightCase(module: any, exports: any, require: any, i: any, r: any, a: any): any;
        _twoLights2to2Point5(module: any, exports: any, require: any, i: any, r: any, a: any): any;
        _twoLights2Point5to3(module: any, exports: any, require: any, i: any, r: any, a: any): any;
        _manyLightsLargerThan3(module: any, exports: any, require: any, i: any, r: any, a: any): any;
        _oneLight4L(module: any, exports: any, require: any, i: any, r: any, a: any): any;
        _oneLight4SmallL(module: any, exports: any, require: any, i: any, n: any, r: any): any;
        _manyLights4L(module: any, exports: any, require: any, i: any, r: any, a: any): any;
        _twoSymmetricLights(module: any, exports: any, require: any, i: any, n: any, r: any, a: any, s: any): any;
        _manySymmetricLights(module: any, exports: any, require: any, i: any, n: any, r: any, a: any, s: any, l: any): any;
    }
    export const templateKey: any;
    export const REALISTIC: any;
    export const CHILLY_3: any;
    export const NATURE_3: any;
    export const temperature: any;
    export const ies: any;
    export const default: any;
    export const offset: any;
    export const lShape: any;
    export const lwidth: any;
    // Original Name: r
    export class default extends import("22777").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    // Original Name: l
    export class temperature {
        constructor(...args: any[]);
        init(module: any, exports: any): any;
        layout(module: any, exports: any, require: any): any;
        _postProcess1(module: any): any;
    }
    export const _roomInfo: any;
    export const _parameter: any;
    export const return: any;
    export const SpotLight: any;
    export const SPOT_LIGHT_NUM_5: any;
    export const ruleType: any;
    // Original Name: c
    export class sourceContentType extends temperature {
    }
    // Original Name: d
    export class y extends temperature {
    }
    // Original Name: h
    export class z extends temperature {
    }
    export class u extends temperature {
    }
    // Original Name: g
    export class IntelligentLightsUtil extends temperature {
    }
    // Original Name: p
    export class XRotation extends temperature {
    }
    // Original Name: f
    export class YRotation extends temperature {
        layout(module: any, exports: any, require: any): any;
    }
    export const CommonOptions: any;
    export const RuleConfig: any;
    // Original Name: n
    export class z extends import("22777").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    export const syncLightGroup: any;
    export const getDefaultSunlightForTemplate: any;
    export const getTemplateV3Property: any;
    export const isAppliedTemplateV3: any;
    export const isTemplateV3: any;
    export const isAppliedEmptyTemplate: any;
    export const isEmptyTemplate: any;
    export const getLightInfo: any;
    export const multiplier: any;
    export const targetDir: any;
    export const contentID: any;
    export const content: any;
    export const isIntelligent: any;
    export const appliedName: any;
    export const members: any;
    export const ID: any;
    export const paths: any;
    export const bandIndex: any;
    export const eleId: any;
    export const IES: any;
    export const topView: any;
    export const affectSpecular: any;
    export const PhysicalLight: any;
    export const group: any;
    export const hidden: any;
    export const LightSetLibrary: any;
    // Original Name: n
    export class z {
        loadDefault(): any;
        getLightSetData(): any;
        get(module: any): any;
        add(module: any): any;
        delete(module: any): any;
        constructor(...args: any[]);
    }
    export const _lightData: any;
    export const _contentTypes: any;
    export const _priority: any;
    export const _config: any;
    export const _ruleType: any;
    export const NIGHT: any;
    export const getAutoSunLightAngles: any;
    export const getFocusContentAndOpening: any;
    export const XSize: any;
    export const YSize: any;
    // Original Name: h
    export class z {
        constructor(module: any, exports: any, ...args: any[]);
        lerp(module: any): any;
    }
    export const min: any;
    export const max: any;
    export const ZSize: any;
    export const floor: any;
    export const roomType: any;
    export const left: any;
    export const top: any;
    // Original Name: S
    export class VrayLightAceray {
        constructor(module: any, exports: any, ...args: any[]);
        _getScreenPt(module: any): any;
        isPointInFocus(module: any): any;
        isPointInView(module: any): any;
        getContentProjectRectInFocus(module: any): any;
        getContentPercentInView(module: any): any;
        isContentInViewBox(module: any): any;
        _getContentProjectBound(module: any, exports: any): any;
        findLargestContentInFocus(module: any): any;
    }
    export const camera: any;
    export const canvasSize: any;
    export const w: any;
    export const threeCamera: any;
    export const target: any;
    export const clip: any;
    export const near: any;
    export const far: any;
    export const l: any;
    export const exports: any;
    export const h: any;
    export const focusBox: any;
    export const viewBox: any;
    export const width: any;
    // Original Name: P
    export class FurnitureLight {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        _isValidContent(module: any): any;
        _getContentsInCamera(): any;
        _getContentsInFocus(): any;
        _isPriorityContent(module: any): any;
        _getFocusContents(): any;
        getContentsOpening(module: any): any;
        getContentLightSetting(module: any): any;
        getSunPos(module: any, exports: any, require: any, i: any): any;
        getVifaSunlightAngles(module: any, exports: any): any;
        getDuskSunlightAngles(module: any, exports: any): any;
        getSunlightAngles(module: any, exports: any): any;
    }
    export const room: any;
    export const contents: any;
    export const viewbox: any;
    export const target_x: any;
    export const target_y: any;
    export const PI: any;
    export const windowPos: any;
    // Original Name: E
    export class FurnitureSpotLight extends FurnitureLight {
        _getFocusContents(): any;
    }
    // Original Name: M
    export class VrayLightVirtualArea extends FurnitureLight {
        _getFocusContents(): any;
    }
    // Original Name: v
    export class VrayLightRectangle extends FurnitureLight {
    }
    // Original Name: b
    export class VrayLightEllipse extends FurnitureLight {
    }
    // Original Name: n
    export class z extends import("22777").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    export const closestEdge: any;
    export const distance: any;
    // Original Name: r
    export class default extends import("22777").default {
        init(): any;
        _interested(module: any): any;
        _compute(module: any, exports: any, require: any, i: any): any;
        _buildLineSegments(module: any): any;
        _isValid(module: any, exports: any, require: any): any;
    }
    export const lines: any;
    export const totalLength: any;
    export const writable: any;
    export const findRoomByCamera: any;
    export const roomPolygon: any;
    export const getOpeningLine: any;
    export const target_z: any;
    export const getContentRelateLight: any;
    export const LightRoomIdVisitor: any;
    export const VrayLightFactory: any;
    export const VrayLightSphere: any;
    export const VrayLightDome: any;
    export const VrayLightIESMax: any;
    export const VraySunLight: any;
    export const VrayLightMesh: any;
    export const VrayLight: any;
    export const VrayTypeNameEnum: any;
    export const VrayTypeEnum: any;
    export const AreaFlat: any;
    export const FORBID_FLAG: any;
    export const Sphere: any;
    export const AreaEllipse: any;
    // Original Name: m
    export class ZRotation {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        getIndex(): any;
        toLightJson(): any;
    }
    export const nodeType: any;
    export const roomId: any;
    export const volumeLight: any;
    export const DefaultLightIdType: any;
    // Original Name: y
    export class VrayLightMesh extends ZRotation {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const meshRef: any;
    export const close: any;
    export const rgb: any;
    export const color_temperature: any;
    export const DoubleSided: any;
    export const invisible: any;
    export const units: any;
    export const enabled: any;
    // Original Name: _
    export class VraySunLight extends ZRotation {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const filterColor: any;
    export const sizeMultiplier: any;
    export const src_position: any;
    export const target_position: any;
    export const filter_Color: any;
    export const intensity_multiplier: any;
    export const turbidity: any;
    export const size_multiplier: any;
    export const sky_model: any;
    // Original Name: C
    export class temperature extends ZRotation {
        constructor(module: any, exports: any, require: any, ...args: any[]);
        toLightJson(): any;
    }
    export const direction: any;
    export const upVector: any;
    export const power: any;
    export const ies_file: any;
    export const iesUrl: any;
    export const isPublicIES: any;
    // Original Name: S
    export class VrayLightAceray extends temperature {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const nearAttenuationStart: any;
    export const nearAttenuationEnd: any;
    export const farAttenuationStart: any;
    export const farAttenuationEnd: any;
    export const hotspotAngle: any;
    export const falloffAngle: any;
    // Original Name: P
    export class FurnitureLight extends ZRotation {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const intensityScale: any;
    export const isAssembly: any;
    export const affectReflections: any;
    // Original Name: E
    export class FurnitureSpotLight extends ZRotation {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const iesRotations: any;
    // Original Name: M
    export class VrayLightVirtualArea extends ZRotation {
        constructor(module: any, exports: any, require: any, i: any, ...args: any[]);
        toLightJson(): any;
    }
    export const vrayType: any;
    export const doubleSided: any;
    export const double_flat: any;
    export const u_size: any;
    export const v_size: any;
    export const skylightPortal: any;
    export const renderVisible: any;
    // Original Name: v
    export class VrayLightRectangle extends VrayLightVirtualArea {
        constructor(module: any, exports: any, ...args: any[]);
    }
    // Original Name: b
    export class VrayLightEllipse extends VrayLightVirtualArea {
        constructor(module: any, exports: any, ...args: any[]);
    }
    // Original Name: T
    export class VrayLightDome extends ZRotation {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const textureTemperature: any;
    export const affectDiffuse: any;
    export const textureType: any;
    export const castShadow: any;
    // Original Name: x
    export class VrayLightSphere extends ZRotation {
        constructor(module: any, exports: any, ...args: any[]);
        toLightJson(): any;
    }
    export const radius: any;
    export const index: any;
    // Original Name: I
    export class LightRoomIdVisitor {
        visit(module: any, exports: any, require: any): any;
        getRoomIdOfPoint(module: any, exports: any): any;
        constructor(...args: any[]);
    }
    // Original Name: n
    export class z extends import("22777").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    export const SlabFaceType: any;
    export const SunlightOption: any;
    export const Content: any;
    export const RoomTypeEnum: any;
    export const Floorplan: any;
    export const LightTypeEnum: any;
    export const Light: any;
    export const LightGroup: any;
    export const LightGroupTemplateEnum: any;
    export const LightGroupEmptyTemplateEnum: any;
    export const VrayLightExporter: any;
    export const LightSetConfig: any;
    export const SunlightUtil: any;
    export const DefaultSunlightOptions: any;
    export const ChangeableDefaultSunlightParams: any;
    export const ExportLights: any;
    export const IParsedFgiResult: any;
    export const Util: any;
    export const ExportSceneData: any;
    // Original Name: n
    export class z extends import("22777").default {
        _compute(module: any, exports: any, require: any, i: any): any;
    }
    // Original Name: s
    export class double_flat extends import("22777").default {
        _compute(module: any, exports: any, require: any, i: any): any;
        _getContents(module: any): any;
    }
    // Original Name: n
    export class z extends import("22777").default {
        _compute(module: any, exports: any, require: any, i: any): any;