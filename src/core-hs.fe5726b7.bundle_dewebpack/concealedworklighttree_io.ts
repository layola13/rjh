import { Entity } from './Entity';
import { ConcealedWorkTree_IO, ConcealedWorkTree } from './ConcealedWorkTree';
import { ConcealedWorkLightWire } from './ConcealedWorkLightWire';

export class ConcealedWorkLightTree_IO extends ConcealedWorkTree_IO {
    dump(entity: unknown, param2: unknown, includeChildren: boolean = true, options: Record<string, unknown> = {}): unknown {
        return super.dump(entity, undefined, includeChildren, options);
    }

    load(entity: unknown, data: unknown, context: unknown): void {
        super.load(entity, data, context);
    }
}

export class ConcealedWorkLightTree extends ConcealedWorkTree {
    protected _children!: Record<string, unknown>;

    getIO(): ConcealedWorkLightTree_IO {
        return ConcealedWorkLightTree_IO.instance();
    }

    get lightWires(): ConcealedWorkLightWire[] {
        let wires: ConcealedWorkLightWire[] = [];
        const children = Object.values(this._children);
        
        if (children.length) {
            wires = children.filter((child): child is ConcealedWorkLightWire => 
                child instanceof ConcealedWorkLightWire
            );
        }
        
        return wires;
    }

    addLightWire(wire: ConcealedWorkLightWire): void {
        this._addCWEntity(this.lightWires, wire);
    }

    removeLightWire(wire: ConcealedWorkLightWire): void {
        this._removeCWEntity(this.lightWires, wire);
    }

    getLightWire(identifier: unknown): ConcealedWorkLightWire | undefined {
        return this._getCWEntity(this.lightWires, identifier);
    }

    protected _addCWEntity(collection: unknown[], entity: unknown): void {
        // Implementation inherited from parent
    }

    protected _removeCWEntity(collection: unknown[], entity: unknown): void {
        // Implementation inherited from parent
    }

    protected _getCWEntity<T>(collection: T[], identifier: unknown): T | undefined {
        // Implementation inherited from parent
        return undefined;
    }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkLightTree, ConcealedWorkLightTree);