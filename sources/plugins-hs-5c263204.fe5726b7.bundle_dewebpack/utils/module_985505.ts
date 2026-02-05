// @ts-nocheck
import { CoordinateAxis } from './CoordinateAxis';

export default class LightCoordinateAxis extends CoordinateAxis {
    constructor(
        entity: unknown,
        scene: unknown,
        context: unknown,
        options: unknown
    ) {
        super(entity, scene, context, options);
    }

    get contentPosition(): THREE.Vector3 {
        const entity = this.entity as {
            XTarget: number;
            YTarget: number;
            ZTarget: number;
            x: number;
            y: number;
            z: number;
        };

        return this.activeContext.selectLightTarget
            ? new THREE.Vector3(entity.XTarget, entity.YTarget, entity.ZTarget)
            : new THREE.Vector3(entity.x, entity.y, entity.z);
    }
}