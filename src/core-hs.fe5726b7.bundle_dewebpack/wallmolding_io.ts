import { Molding_IO, Molding, MoldingTypeEnum } from './Molding';
import { Entity } from './Entity';

export class WallMolding_IO extends Molding_IO {}

export class WallMolding extends Molding {
    constructor(id: string = "", host?: unknown) {
        super(id, host);
    }

    get thickness(): number {
        return this.XSize;
    }

    set thickness(value: number) {
        this.XSize = value;
    }

    get height(): number {
        return this.YSize;
    }

    set height(value: number) {
        this.YSize = value;
    }

    get defaultThickness(): number {
        return this.XLength;
    }

    get defaultHeight(): number {
        return this.YLength;
    }

    get sweepPath(): unknown[] {
        return [];
    }

    getIO(): WallMolding_IO {
        return WallMolding_IO.instance();
    }

    getMetadataFilterKeys(): Set<string> {
        const filterKeys = super.getMetadataFilterKeys();
        ["heightOffset"].forEach((key: string) => {
            filterKeys.add(key);
        });
        return filterKeys;
    }

    dirtyNeighborMoldingsByFacetype(): void {
        const host = this.getHost();
        const geometryManager = HSCore.Doc.getDocManager().geometryManager;

        if (!(host && host instanceof HSCore.Model.Face)) {
            return;
        }

        const roomInfo = geometryManager.getFaceRoomInfo(host);
        if (!roomInfo) {
            return;
        }

        const prevWallFace = roomInfo.getPrevWallFace(host);
        if (prevWallFace) {
            const prevMoldings = prevWallFace.getMolding(this.type);
            if (prevMoldings?.length) {
                prevMoldings.forEach((molding: WallMolding) => molding.dirtyGeometry());
            }
        }

        const nextWallFace = roomInfo.getNextWallFace(host);
        if (nextWallFace) {
            const nextMoldings = nextWallFace.getMolding(this.type);
            if (nextMoldings?.length) {
                nextMoldings.forEach((molding: WallMolding) => molding.dirtyGeometry());
            }
        }
    }

    static isValidMoldingType(moldingType: MoldingTypeEnum): boolean {
        return (
            moldingType === MoldingTypeEnum.Baseboard ||
            moldingType === MoldingTypeEnum.Cornice ||
            moldingType === MoldingTypeEnum.WallBoardBaseboard ||
            moldingType === MoldingTypeEnum.WallBoardWaistLine
        );
    }
}

Entity.registerClass(HSConstants.ModelClass.NgWallMolding, WallMolding);