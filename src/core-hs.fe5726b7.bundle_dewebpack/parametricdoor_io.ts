import { MathAlg, Line3d } from './math';
import { MaterialUtil, PaintsUtil } from './material';
import { BackgroundPathUtil } from './path';
import { EntityField } from './decorators';
import { Entity } from './entity';
import { Floor } from './floor';
import { ParametricOpening_IO, ParametricOpening } from './parametric-opening';
import { FaceUtil } from './face-util';

export class ParametricDoor_IO extends ParametricOpening_IO {
    dump(
        entity: ParametricDoor,
        context: unknown,
        deepClone: boolean = true,
        options: Record<string, unknown> = {}
    ): unknown[] {
        let results = super.dump(entity, context, deepClone, options);
        const data = results[0] as Record<string, unknown>;

        data.doorStoneMaterialEnabled = entity.doorStoneMaterialEnabled;
        data.swing = entity.swing;
        data.isDefaultAlign = entity.isDefaultAlign;

        if (entity.bottomFaceMaterial) {
            try {
                data.bottomFaceMaterialId = entity.bottomFaceMaterial?.id;
                if (deepClone || this.mustDeepClone(entity.bottomFaceMaterial.id)) {
                    results = results.concat(entity.bottomFaceMaterial.dump(context, deepClone, options));
                }
            } catch (error) {
                if (error instanceof Error) {
                    entity.logger.assert(
                        false,
                        `failed to dump material of ${entity.tag}: ${error.stack}`
                    );
                }
            }
        }

        return results;
    }

    load(
        entity: ParametricDoor,
        data: Record<string, unknown>,
        options: Record<string, unknown> = {}
    ): void {
        entity.doorStoneMaterialEnabled = data.doorStoneMaterialEnabled as boolean;
        entity.isDefaultAlign = data.isDefaultAlign as boolean;
        entity.swing = data.swing as number;

        if (data.bottomFaceMaterialId) {
            const material = Entity.loadFromDumpById(data.bottomFaceMaterialId as string, options);
            entity._bottomFaceMaterial = material;
            if (
                entity.bottomFaceMaterial?.mixpaint &&
                !entity.bottomFaceMaterial.mixpaint.faceEntity
            ) {
                entity.bottomFaceMaterial.mixpaint.faceEntity = entity;
            }
        }

        super.load(entity, data, options);
    }
}

export class ParametricDoor extends ParametricOpening {
    private __doorStoneMaterialEnabled: boolean = false;
    private __isDefaultAlign: boolean = false;
    private _swing: number = 0;
    _bottomFaceMaterial: unknown;

    static create(metadata: Record<string, unknown>): ParametricDoor | null {
        if (!metadata || !metadata.contentType) {
            log.error(
                `Content.create: invalid input metadata '${JSON.stringify(metadata)}'.`,
                'HSCore.CreateEntity.Error'
            );
            return null;
        }

        const door = new ParametricDoor();
        door.initByMeta(metadata);
        return door;
    }

    constructor(name: string = '', parent?: unknown) {
        super(name, parent);
        this.__doorStoneMaterialEnabled = false;
        this.__isDefaultAlign = false;
        this.swing = 0;
    }

    protected _onDoorStoneMaterialStatusChanged(): void {
        // Hook for material status changes
    }

    getFinalZRotation(): number {
        let rotation = 0;

        switch (this.swing) {
            case 1:
            case 2:
                rotation = this.__ZRotation + 180;
                break;
            default:
                rotation = this.__ZRotation;
        }

        return (rotation * Math.PI) / 180;
    }

    setBottomFaceMaterial(material: unknown): void {
        this.bottomFaceMaterial = material;
    }

    getBottomFaceMaterial(): unknown {
        return this.bottomFaceMaterial;
    }

    protected _setBottomFaceMaterial(material: unknown): void {
        const bottomFace = this.getBottomFaces()[0];

        if (material && !MaterialUtil.isMixPaintMaterial(material) && bottomFace) {
            material.createUniquePolygon(
                BackgroundPathUtil.getCurvePath(bottomFace),
                bottomFace
            );
        }

        this._bottomFaceMaterial = material;

        if (bottomFace) {
            bottomFace.material = material;
        }

        bottomFace.dirtyGeometry();
    }

    getConnectFloors(excludeFloors: unknown[] = []): Floor[] {
        const connectedFloors: Floor[] = [];
        const bottomPoints: unknown[] = [];

        this.getBottomFaces().forEach(face =>
            face.worldRawPath2d.outer.forEach(point => bottomPoints.push(point))
        );

        this.getUniqueParent()
            .getFaceQuery()
            .forEach(face => {
                if (
                    face instanceof Floor &&
                    !excludeFloors.includes(face) &&
                    !connectedFloors.includes(face) &&
                    bottomPoints.some(point => {
                        const facePath = face.worldRawPath2d;
                        return [facePath.outer]
                            .concat(facePath.holes)
                            .flat()
                            .some(curve =>
                                [
                                    MathAlg.CurveCuvePositonType.OVERLAP,
                                    MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
                                ].includes(MathAlg.PositionJudge.curveCurveOverlap(curve, point))
                            );
                    })
                ) {
                    connectedFloors.push(face);
                }
            });

        return connectedFloors;
    }

    toggleDoorStoneAlignSide(): void {
        this.isDefaultAlign = !this.isDefaultAlign;
    }

    getDoorStoneAlignSideStatus(): boolean {
        return this.isDefaultAlign;
    }

    protected _onDefaultAlignChanged(oldValue: boolean, newValue: boolean): void {
        // Hook for alignment changes
    }

    getBottomFace(): unknown {
        return this.getBottomFaces()[0];
    }

    getDoorStoneFace(): unknown | undefined {
        const bottomFace = this.getBottomFaces()[0];
        return this.doorStoneMaterialEnabled && HSCore.Util.Math.isZero(this.z)
            ? bottomFace
            : undefined;
    }

    getZeroHeightBottomFace(): unknown | undefined {
        const bottomFace = this.getBottomFaces()[0];
        return this.doorStoneMaterialEnabled ? undefined : bottomFace;
    }

    getRefreshFloors(floors: unknown[] = []): unknown[] {
        const wallInnerFace = this.getWallInnerFace();
        wallInnerFace?.roomInfos.forEach(roomInfo => {
            floors.push(...roomInfo.floors);
        });
        return floors;
    }

    isDoorStoneMaterialEnabled(): boolean {
        return this.doorStoneMaterialEnabled;
    }

    setDoorStoneMaterialStatus(enabled: boolean): void {
        this.doorStoneMaterialEnabled = enabled;
    }

    updateFaceMixPaint(useDoorStone: boolean = false): void {
        const doorStoneFace = useDoorStone ? this.getDoorStoneFace() : undefined;
        this.linkFaces.forEach(face => {
            if (!doorStoneFace || doorStoneFace.id !== face.id) {
                this._updateFaceMixpaint(face);
            }
        });
    }

    getPocket(): unknown {
        // Returns pocket information
    }

    offsetOpeningCutPath(
        segments: unknown[],
        offset: number,
        context: { surfaceObj: { surface: unknown } }
    ): Line3d[] {
        let innerSegment: unknown;
        let outerSegment: unknown;

        segments.forEach(segment => {
            if (
                context.surfaceObj.surface.containsPoint(segment.getStartPt()) &&
                context.surfaceObj.surface.containsPoint(segment.getEndPt())
            ) {
                innerSegment = segment;
            } else if (
                !context.surfaceObj.surface.containsPoint(segment.getStartPt()) &&
                !context.surfaceObj.surface.containsPoint(segment.getEndPt())
            ) {
                outerSegment = segment;
            }
        });

        if (!innerSegment || !outerSegment) {
            return [];
        }

        innerSegment.extendDouble(offset);
        outerSegment.extendDouble(offset);

        const connectLine1 = new Line3d(innerSegment.getStartPt(), outerSegment.getEndPt());
        const connectLine2 = new Line3d(outerSegment.getStartPt(), innerSegment.getEndPt());

        return [innerSegment, connectLine1, outerSegment, connectLine2];
    }

    getFaceHoleBottomProfile(): unknown[] {
        const EPSILON = 1e-6;
        if (Math.abs(this.z) >= EPSILON) {
            return [];
        }
        return this.getBottomFaces().map(face => face.wirePath.outer);
    }

    onSwingChanged(): void {
        // Hook for swing direction changes
    }

    protected _updateFaceMixpaint(face: unknown): void {
        if (
            HSCore.Util.Content.isWallOpening(this) &&
            MaterialUtil.isMixPaintMaterial(face.material)
        ) {
            PaintsUtil.updateFaceMixpaint(face);
        }
    }

    getPocketWidth(isLeftSide: boolean): number {
        const METERS_CONVERSION = 1e3;
        let width = 0;

        if (this.swing === 0 || this.swing === 3) {
            width = isLeftSide
                ? (this.storeProperty.get('AKD') ?? this.storeProperty.get('ACTKD'))
                : (this.storeProperty.get('BKD') ?? this.storeProperty.get('BCTKD'));
        } else {
            width = isLeftSide
                ? (this.storeProperty.get('BKD') ?? this.storeProperty.get('BCTKD'))
                : (this.storeProperty.get('AKD') ?? this.storeProperty.get('ACTKD'));
        }

        return width / METERS_CONVERSION;
    }

    getBaseboardCutterInfo(face: unknown): unknown[] {
        if (this.getFaceHoleBottomProfile().length === 0) {
            return [];
        }

        let isLeftSide = face.roomInfos.length > 0;

        if (face.roomInfos.length > 0) {
            const master = face.getMaster();
            if (master instanceof HSCore.Model.Wall) {
                const faceType = FaceUtil.getFaceType(face);
                const leftFaces = Object.values(master.leftFaces);
                const rightFaces = Object.values(master.rightFaces);
                const roomFaces = master.roomInfos.map(room => room.faces).flat();

                if (
                    roomFaces.some(roomFace => leftFaces.includes(roomFace)) &&
                    roomFaces.some(roomFace => rightFaces.includes(roomFace))
                ) {
                    isLeftSide = faceType === 'left';
                }
            }
        }

        let pocketOffset = 0;
        const hasPocket = this.hasPocketInFace(face);
        if (hasPocket) {
            pocketOffset = this.getPocketWidth(isLeftSide);
        }

        const cutInfo = this.getOffsetCutInfo(face, pocketOffset);

        const EPSILON = 1e-6;
        if (!hasPocket && this.z < EPSILON) {
            cutInfo.forEach(info => {
                info.cutPath.forEach(pathSegment => {
                    const startInSurface = face.surfaceObj.surface.containsPoint(pathSegment.getStartPt());
                    const endInSurface = face.surfaceObj.surface.containsPoint(pathSegment.getEndPt());

                    if ((startInSurface && !endInSurface) || (!startInSurface && endInSurface)) {
                        info.patchLines.push(pathSegment);
                    }
                });
            });
        }

        return cutInfo;
    }

    getIO(): ParametricDoor_IO {
        return ParametricDoor_IO.instance();
    }

    @EntityField({
        postSet() {
            this._onDoorStoneMaterialStatusChanged();
            const bottomFace = this.getBottomFace();
            if (bottomFace) {
                bottomFace.dirtyGeometry();
            }
        }
    })
    doorStoneMaterialEnabled: boolean;

    @EntityField({
        prefix: '_',
        postSet(oldValue: boolean, newValue: boolean) {
            this._onDefaultAlignChanged(oldValue, newValue);
        }
    })
    isDefaultAlign: boolean;

    @EntityField({
        prefix: '_',
        equals: () => false,
        partialSet(material: unknown) {
            this._setBottomFaceMaterial(material);
        }
    })
    bottomFaceMaterial: unknown;

    @EntityField({
        prefix: '_',
        postSet() {
            switch (this.swing) {
                case 0:
                case 2:
                    this.storeProperty.set(
                        HSConstants.ParametricDoorWindowSystemVariablesName.SingleDoorLeftRightDoorOpenDirection,
                        false
                    );
                    break;
                case 1:
                case 3:
                    this.storeProperty.set(
                        HSConstants.ParametricDoorWindowSystemVariablesName.SingleDoorLeftRightDoorOpenDirection,
                        true
                    );
            }
            this.constructBrep();
        }
    })
    swing: number;
}

Entity.registerClass(HSConstants.ModelClass.ParametricDoor, ParametricDoor);