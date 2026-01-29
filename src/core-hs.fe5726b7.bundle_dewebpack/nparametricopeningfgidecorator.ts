import { NCParametricModelFGIDecorator } from './NCParametricModelFGIDecorator';

export class NParametricOpeningFGIDecorator extends NCParametricModelFGIDecorator {
    constructor(parameter: unknown) {
        super();
    }

    getUvTransform(firstParam: unknown, secondParam: unknown): unknown {
        return this._getUvTransformV1(firstParam, secondParam);
    }
}