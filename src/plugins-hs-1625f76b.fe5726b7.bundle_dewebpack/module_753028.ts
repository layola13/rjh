export const contentManipulationStyles = `
.contentmanipulation {
    z-index: auto;
}

#Content2DFlipButtons {
    position: absolute;
    padding: 9px 11px;
    border: 1px solid #e3e3e3;
    background-color: #ffffff;
    height: 29px;
}

#Content2DFlipButtons .button {
    width: 25px;
    height: 25px;
    margin: 2px 0;
    display: inline-block;
    cursor: pointer;
    float: left;
}

#Content2DFlipButtons .seprator {
    height: 29px;
    border-left: 1px solid #bfbfbf;
    margin: 0 12px;
    display: inline-block;
    float: left;
}

#Content2DFlipButtons .button svg {
    fill: #949494;
}

#Content2DFlipButtons .button svg:hover {
    fill: #36a1f0;
}

.rightpropertybar .elevation_divider {
    margin-top: 10px;
}

.rightpropertybar .roomproperty_firstRowhdivider {
    margin-top: 9px;
}

.rightpropertybar .roomproperty_secondRowhdivider {
    margin-top: 9px;
}

.rightpropertybar .width_thick_vdivider {
    margin-right: 5px;
}

.rightpropertybar .thick_height_vdivider {
    margin-right: 5px;
}

.rightpropertybar .length_thick_vdivider {
    margin-right: 5px;
}

.rightpropertybar .width_height_vdivider {
    margin-right: 5px;
}

.rightpropertybar .width_length_height_default_vdivider {
    margin-right: 13px;
    margin-top: 10px;
}

.rightpropertybar .orthoMode_divider {
    margin-top: 9px;
}

.rightpropertybar .lock_inactive {
    background-image: url(LOCK_INACTIVE_IMAGE_PATH);
    background-repeat: no-repeat;
}

.rightpropertybar .lock_active {
    background-image: url(LOCK_ACTIVE_IMAGE_PATH);
    background-repeat: no-repeat;
}

.rightpropertybar .customized_tiles_rotate_divider {
    vertical-align: middle;
    padding: 12px 0;
    border-right: 1px solid #cfcfcf;
    font-size: 20px;
    box-sizing: border-box;
    display: inline-block;
}

.rightpropertybar .model-unlock-dimension {
    margin-top: 8px;
    margin-left: 64px;
    width: 88px;
    box-sizing: content-box;
}

.rightpropertybar .panel-body {
    width: 220px;
    height: 220px;
    padding: 0px;
    margin-top: 7px;
    background-color: #ffffff;
    position: relative;
    background: #F2F2F3;
    border-radius: 2px;
}

.rightpropertybar .panel-body .panel-molding-contnt {
    width: 160px;
    height: 160px;
    position: absolute;
    top: 25px;
    left: 18px;
    right: 15px;
}

.rightpropertybar .panel-body .panel-molding-slider-x {
    position: absolute;
    bottom: 14px;
    left: 58px;
}

.rightpropertybar .panel-body .panel-molding-slider-y {
    transform: rotate(90deg);
    position: absolute;
    top: 98px;
    right: -22px;
}

.rightpropertybar-line-position-panel .panel-body {
    width: 210px;
    height: 220px;
    padding: 0px;
    margin-top: 7px;
    background-color: #ffffff;
    position: relative;
    background: #F2F2F3;
    border-radius: 2px;
}

.rightpropertybar-line-position-panel .panel-body .panel-molding-contnt {
    width: 160px;
    height: 160px;
    position: absolute;
    top: 25px;
    left: 18px;
    right: 15px;
}

.rightpropertybar-line-position-panel .panel-body .panel-molding-slider-x {
    position: absolute;
    bottom: 14px;
    left: 58px;
}

.rightpropertybar-line-position-panel .panel-body .panel-molding-slider-y {
    transform: rotate(90deg);
    position: absolute;
    top: 98px;
    right: -22px;
}

.rightpropertybar .light-slot-panel-body {
    width: 220px;
    height: 200px;
    padding: 0px;
    margin-top: 4px;
    background-color: #ffffff;
    position: relative;
    background: #F2F2F3;
    border-radius: 2px;
}

.rightpropertybar .light-slot-panel-body .ceiling-indicator {
    width: 80px;
    height: 80px;
    background-color: #D9D8D8;
    border-color: #c9c6c6;
    border-width: 0.5px;
    display: inline-block;
}

.rightpropertybar .light-slot-panel-body .slot {
    stroke-width: 2;
}

.rightpropertybar .light-slot-panel-body .slot-flipped {
    stroke-width: 2;
}

.rightpropertybar-light-slot-panel .light-slot-panel-body {
    width: 210px;
    height: 220px;
    padding: 0px;
    margin-top: 4px;
    background-color: #ffffff;
    position: relative;
    background: #F2F2F3;
    border-radius: 2px;
}

.rightpropertybar-light-slot-panel .light-slot-panel-body .ceiling-indicator {
    width: 80px;
    height: 80px;
    background-color: #D9D8D8;
    border-color: #c9c6c6;
    border-width: 0.5px;
    display: inline-block;
}

.rightpropertybar-light-slot-panel .light-slot-panel-body .slot {
    stroke-width: 2;
}

.rightpropertybar-light-slot-panel .light-slot-panel-body .slot-flipped {
    stroke-width: 2;
}

.rightpropertybar .customized-molding-flip,
.rightpropertybar .customized-light-slot-flip {
    margin: 7px 0;
}

.rightpropertybar .customized-molding-flip .radio-title,
.rightpropertybar .customized-light-slot-flip .radio-title {
    width: 52px;
}

.rightpropertybar .customized-molding-flip .react-radio-btn .radio-item,
.rightpropertybar .customized-light-slot-flip .react-radio-btn .radio-item {
    width: 50px;
}

.rightpropertybar .customized-molding-flip .react-radio-btn .radio-item img,
.rightpropertybar .customized-light-slot-flip .react-radio-btn .radio-item img {
    width: 19px;
    height: 19px;
}

.rightpropertybar .customized-molding-flip .react-radio-btn .radio-item:first-child,
.rightpropertybar .customized-light-slot-flip .react-radio-btn .radio-item:first-child {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
}

.rightpropertybar .customized-molding-flip .react-radio-btn .radio-item:last-child,
.rightpropertybar .customized-light-slot-flip .react-radio-btn .radio-item:last-child {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
}

.rightpropertybar .customized-light-slot-flip .react-radio-btn .radio-item img {
    width: 15px;
    height: 15px;
}

.global-en .rightpropertybar .model-unlock-dimension {
    margin-left: 15px;
}
`;

export default contentManipulationStyles;