import { Entity } from './Entity';
import { ParametricContentBase_IO, ParametricContentBase } from './ParametricContentBase';

export class ParametricCurtain_IO extends ParametricContentBase_IO {}

export class ParametricCurtain extends ParametricContentBase {
    getIO(): ParametricCurtain_IO {
        return ParametricCurtain_IO.instance();
    }
}

Entity.registerClass(HSConstants.ModelClass.ParametricCurtain, ParametricCurtain);