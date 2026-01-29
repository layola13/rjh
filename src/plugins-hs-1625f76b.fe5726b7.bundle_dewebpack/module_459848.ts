import { SignalHook } from 'HSCore/Util/SignalHook';
import { BrepBound } from 'HSCore/Util/BrepBound';
import { getContentsSVGAttributes } from './contentsSVGUtils';
import { HSApp } from './HSApp';
import type { SVGElement, Matrix } from './SVGTypes';

interface Entity {
    signalFieldChanged: Signal;
    bound: BrepBound;
}

interface Context {
    application: Application;
    rect(width: number, height: number): SVGElement;
}

interface Application {
    cmdManager: CommandManager;
}

interface CommandManager {
    // Add command manager methods as needed
}

interface Layer {
    appendChild(element: SVGElement): void;
    removeChild(element: SVGElement): void;
}

interface BoundRect {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface ContentAttributes extends BoundRect {
    rotation: number;
}

interface Signal {
    // Signal interface
}

const COLOR_CONTENT_STROKE_SELECTED = HSApp.View.SVG.Constants.COLOR_CONTENT_STROKE_SELECTED;
const STROKE_WIDTH = 2;
const FILL_OPACITY = 1;

export default class EntityGizmo extends HSApp.View.Base.Gizmo {
    private entities: Entity[];
    private context: Context;
    private layer: Layer;
    private app: Application;
    private cmdMgr: CommandManager;
    private element?: SVGElement[];
    private _signalHook1: SignalHook;
    private _memberBoundElements?: SVGElement[];

    constructor(context: Context, layer: Layer, entities: Entity[]) {
        super(context, layer, entities[0]);
        
        this.entities = entities;
        this.context = context;
        this.layer = layer;
        this.app = context.application;
        this.cmdMgr = this.app.cmdManager;
        this.element = undefined;
        this._signalHook1 = new SignalHook(this);

        this.entities.forEach((entity: Entity) => {
            this._signalHook1.listen(entity.signalFieldChanged, () => {
                this.dirty = true;
            });
        });
    }

    onActivate(): void {
        this._signalHook1.unlistenAll();
    }

    draw(): void {
        super.draw([]);

        const aggregateBound = new BrepBound(Infinity, Infinity, 0, 0);
        
        for (let i = 0; i < this.entities.length; i++) {
            aggregateBound.appendBound(this.entities[i].bound);
        }

        const screenBound = this._boundToScreen(aggregateBound);
        const contentsAttributes = getContentsSVGAttributes(this.entities);

        if (!this.element) {
            this._memberBoundElements = contentsAttributes.map((attrs: ContentAttributes) => {
                return this.context.rect(attrs.width, attrs.height)
                    .move(attrs.left, attrs.top)
                    .attr({
                        stroke: COLOR_CONTENT_STROKE_SELECTED,
                        'stroke-width': STROKE_WIDTH,
                        'fill-opacity': FILL_OPACITY,
                        'pointer-events': 'none',
                        'vector-effect': 'non-scaling-stroke'
                    });
            });

            const mainRect = this.context.rect(screenBound.width, screenBound.height)
                .move(screenBound.left, screenBound.top)
                .attr({
                    stroke: COLOR_CONTENT_STROKE_SELECTED,
                    'stroke-width': STROKE_WIDTH,
                    'fill-opacity': FILL_OPACITY,
                    'vector-effect': 'non-scaling-stroke'
                });

            this.element = [mainRect, ...this._memberBoundElements];
            
            this.element.forEach((elem: SVGElement) => {
                this.layer.appendChild(elem);
            });
        }

        this.element[0].attr({
            x: screenBound.left,
            y: screenBound.top,
            width: screenBound.width,
            height: screenBound.height
        });

        this._memberBoundElements?.forEach((elem: SVGElement, index: number) => {
            const attrs = contentsAttributes[index];
            elem.attr({
                x: attrs.left,
                y: attrs.top,
                width: attrs.width,
                height: attrs.height
            });

            const centerX = attrs.left + attrs.width * 0.5;
            const centerY = attrs.top + attrs.height * 0.5;
            const matrix = new HSApp.View.SVG.Matrix().rotate(attrs.rotation, centerX, centerY);
            elem.attr('transform', matrix);
        });
    }

    onCleanup(): void {
        if (this._signalHook1) {
            this._signalHook1.dispose();
            this._signalHook1 = undefined as any;
        }

        this._cleanUpElements(this.element);
        super.onCleanup([]);
    }

    private _cleanUpElements(elements?: SVGElement[]): void {
        if (!elements) {
            return;
        }

        for (let i = 0; i < elements.length; i++) {
            this.layer.removeChild(elements[i]);
            elements[i].remove();
            elements[i] = undefined as any;
        }
    }

    private _boundToScreen(bound: BrepBound): BoundRect {
        const topLeft = HSApp.View.SVG.Util.ModelPointToCanvas([
            bound.left,
            bound.top + bound.height
        ]);
        
        const bottomRight = HSApp.View.SVG.Util.ModelPointToCanvas([
            bound.left + bound.width,
            bound.top
        ]);

        return {
            left: topLeft[0],
            top: topLeft[1],
            width: bottomRight[0] - topLeft[0],
            height: bottomRight[1] - topLeft[1]
        };
    }
}