import { FaceInfo } from './FaceInfo';

export class BeamFaceInfo extends FaceInfo {
    public readonly isAux: boolean;
    public readonly curve: unknown;

    constructor(face: unknown, isAux: boolean) {
        super(face);
        this.isAux = isAux;
        this.curve = this.linkBeam.curve;
    }

    get linkBeam(): unknown {
        return this.face.getMaster();
    }
}