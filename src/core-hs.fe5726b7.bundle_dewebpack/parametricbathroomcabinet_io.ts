import { Entity } from './Entity';
import { ParametricContentBase_IO, ParametricContentBase } from './ParametricContentBase';

export class ParametricBathroomCabinet_IO extends ParametricContentBase_IO {}

export class ParametricBathroomCabinet extends ParametricContentBase {
    getIO(): ParametricBathroomCabinet_IO {
        return ParametricBathroomCabinet_IO.instance();
    }
}

Entity.registerClass(HSConstants.ModelClass.ParametricBathroomCabinet, ParametricBathroomCabinet);