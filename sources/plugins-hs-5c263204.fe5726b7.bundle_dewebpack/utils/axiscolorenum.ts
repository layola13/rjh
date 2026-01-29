import { Vector3 } from './Vector3';

export const RotationScaleFactor = {
    FPScale: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 5,
    OrbitScale: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 10,
    OrthScale: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 10
};

export const RotationColor = {
    normalArcColor_xy: 3309055,
    normalArcColor: 3309055,
    hoverArcColor: 24063,
    normalOpacity_xy: 0.75,
    normalOpacity: 0.5,
    hoverOpacity: 1
};

export const ConstantVector = {
    xyAngleZeroDir: Vector3.readonlyY(),
    yzAngleZeroDir: Vector3.readonlyZ(),
    xzAngleZeroDir: Vector3.readonlyX(),
    xyNormal: Vector3.readonlyZ(),
    yzNormal: Vector3.readonlyX(),
    xzNormal: Vector3.readonlyY()
};

export const AxisScaleFactor = {
    FPScale: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 5,
    OrbitScale: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 10,
    OrthScale: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE
};

export enum AxisColorEnum {
    AxisXColor = 16206924,
    AxisYColor = 3309055,
    AxisZColor = 5293848
}

export const MoveArrowColor = {
    normalRed: 16206924,
    hoverRed: 15999008,
    normalBlue: 3309055,
    hoverBlue: 24063,
    normalGreen: 5293848,
    hoverGreen: 4445184,
    normalOpacity: 0.75,
    hoverOpacity: 1
};

export const MoveArrowScaleFactor = {
    FPScaleX: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 10,
    FPScaleY: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 6,
    FPScaleRadius: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 4,
    OrbitScaleX: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 20,
    OrbitScaleY: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 12,
    OrbitScaleRadius: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 8,
    OrthScaleX: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 10,
    OrthScaleY: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 6,
    OrthScaleRadius: HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 4
};

export const ResizeBoxColor = {
    NormalColor: 255,
    WaringColor: 16711680
};