import { ComponentTypeDump } from './componenttypedump';
import { TreeComp, TreeCompEnum } from './treecomp';

export class StrongElecComp extends TreeComp {
    static readonly Type = TreeCompEnum.StrongElec;

    private _referObject?: unknown;

    get type(): TreeCompEnum {
        return StrongElecComp.Type;
    }

    dump(): { tp: ComponentTypeDump } {
        return {
            tp: ComponentTypeDump.StrongElec
        };
    }

    static load(data: unknown, referObject: unknown): StrongElecComp {
        const instance = new StrongElecComp();
        instance._referObject = referObject;
        return instance;
    }
}