import { Entity } from './Entity';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { ParametricModelContent_IO, ParametricModelContent } from './ParametricModelContent';

class NCPBackgroundWallContent_IO extends ParametricModelContent_IO {
}

class NCPBackgroundWallContent extends ParametricModelContent {
    isContentInRoom(room: unknown, includePartial: boolean = false): boolean {
        const parent = NCustomizedFeatureModelUtil.getParentByEntityTypes(
            this,
            [
                HSConstants.ModelClass.NCPBackgroundWallUnit,
                HSConstants.ModelClass.NCustomizedParametricBackgroundWall
            ]
        );
        
        return !!parent && parent.isContentInRoom(room, includePartial);
    }

    getIO(): NCPBackgroundWallContent_IO {
        return NCPBackgroundWallContent_IO.instance();
    }
}

Entity.registerClass(HSConstants.ModelClass.NCPBackgroundWallContent, NCPBackgroundWallContent);

export { NCPBackgroundWallContent_IO, NCPBackgroundWallContent };