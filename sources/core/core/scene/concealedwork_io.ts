import { Entity, Entity_IO } from './Entity';
import { ConcealedWorkLightTree } from './ConcealedWorkLightTree';
import { ConcealedWorkTubeTree } from './ConcealedWorkTubeTree';
import { StrongElecComp } from './StrongElecComp';
import { WeakElecComp } from './WeakElecComp';
import { HotWaterComp } from './HotWaterComp';
import { ColdWaterComp } from './ColdWaterComp';
import { ConcealedWorkPowerSys } from './ConcealedWorkPowerSys';
import { ConcealedWorkCompEntity } from './ConcealedWorkCompEntity';
import { ConcealedWorkLightControlSys } from './ConcealedWorkLightControlSys';

interface DumpOptions {
    [key: string]: unknown;
}

export class ConcealedWork_IO extends Entity_IO {
    dump(
        entity: unknown,
        target: unknown,
        includeChildren: boolean = true,
        options: DumpOptions = {}
    ): unknown {
        return super.dump(entity, target, includeChildren, options);
    }

    load(entity: unknown, source: unknown, context: unknown): void {
        super.load(entity, source, context);
    }
}

export class ConcealedWork extends ConcealedWorkCompEntity {
    getIO(): ConcealedWork_IO {
        return ConcealedWork_IO.instance();
    }

    get powerSystems(): ConcealedWorkPowerSys[] {
        return Object.values(this._children).filter(
            (child): child is ConcealedWorkPowerSys => child instanceof ConcealedWorkPowerSys
        );
    }

    get lightControlSystem(): ConcealedWorkLightControlSys | undefined {
        const systems = Object.values(this._children).filter(
            (child): child is ConcealedWorkLightControlSys => child instanceof ConcealedWorkLightControlSys
        );
        return systems.length > 0 ? systems[0] : undefined;
    }

    get tubeTrees(): ConcealedWorkTubeTree[] {
        let trees: ConcealedWorkTubeTree[] = [];
        const children = Object.values(this._children);
        if (children.length) {
            trees = children.filter(
                (child): child is ConcealedWorkTubeTree => child instanceof ConcealedWorkTubeTree
            );
        }
        return trees;
    }

    get lightTrees(): ConcealedWorkLightTree[] {
        let trees: ConcealedWorkLightTree[] = [];
        const children = Object.values(this._children);
        if (children.length) {
            trees = children.filter(
                (child): child is ConcealedWorkLightTree => child instanceof ConcealedWorkLightTree
            );
        }
        return trees;
    }

    get strongElecTrees(): ConcealedWorkTubeTree[] {
        return this.getTubeTreesByComp(StrongElecComp.Type);
    }

    get weakElecTrees(): ConcealedWorkTubeTree[] {
        return this.getTubeTreesByComp(WeakElecComp.Type);
    }

    get hotWaterTrees(): ConcealedWorkTubeTree[] {
        return this.getTubeTreesByComp(HotWaterComp.Type);
    }

    get coldWaterTrees(): ConcealedWorkTubeTree[] {
        return this.getTubeTreesByComp(ColdWaterComp.Type);
    }

    addPowerSys(powerSystem: ConcealedWorkPowerSys): void {
        this._addCWEntity(this.powerSystems, powerSystem);
    }

    removePowerSys(powerSystem: ConcealedWorkPowerSys): void {
        this._removeCWEntity(this.powerSystems, powerSystem);
    }

    getPowerSys(identifier: unknown): ConcealedWorkPowerSys | undefined {
        return this._getCWEntity(this.powerSystems, identifier);
    }

    addLightControlSys(lightControlSystem: ConcealedWorkLightControlSys): void {
        const existingSystem = this.lightControlSystem;
        this._addCWEntity(existingSystem ? [existingSystem] : [], lightControlSystem);
    }

    removeLightControlSys(lightControlSystem: ConcealedWorkLightControlSys): void {
        const existingSystem = this.lightControlSystem;
        if (existingSystem) {
            this._removeCWEntity([existingSystem], lightControlSystem);
        }
    }

    getTubeTreesByComp(componentType: string): ConcealedWorkTubeTree[] {
        return this.tubeTrees.filter(tree => tree.getComponent(componentType));
    }

    addTubeTree(tubeTree: ConcealedWorkTubeTree): void {
        this._addCWEntity(this.tubeTrees, tubeTree);
    }

    removeTubeTree(tubeTree: ConcealedWorkTubeTree): void {
        this._removeCWEntity(this.tubeTrees, tubeTree);
    }

    getTubeTree(identifier: unknown): ConcealedWorkTubeTree | undefined {
        return this._getCWEntity(this.tubeTrees, identifier);
    }

    addLightTree(lightTree: ConcealedWorkLightTree): void {
        this._addCWEntity(this.lightTrees, lightTree);
    }

    removeLightTree(lightTree: ConcealedWorkLightTree): void {
        this._removeCWEntity(this.lightTrees, lightTree);
    }

    getLightTree(identifier: unknown): ConcealedWorkLightTree | undefined {
        return this._getCWEntity(this.lightTrees, identifier);
    }

    removeTree(tree: ConcealedWorkTubeTree | ConcealedWorkLightTree | Array<ConcealedWorkTubeTree | ConcealedWorkLightTree>): void {
        const trees = Array.isArray(tree) ? tree : [tree];
        trees.forEach(t => {
            if (t instanceof ConcealedWorkTubeTree) {
                this.removeTubeTree(t);
            } else if (t instanceof ConcealedWorkLightTree) {
                this.removeLightTree(t);
            }
        });
    }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWork, ConcealedWork);