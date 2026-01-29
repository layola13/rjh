export const propertyBarImageButtonStyles = `
.property-bar-image-button {
    height: 50px;
    display: flex;
    padding: 3px 0 7px 0;
    align-items: center;
}

.property-bar-image-button-tooltip .homestyler-popover-content {
    width: 210px;
    align-items: center;
    text-align: center;
}

.property-bar-image-button .property-bar-image-button-area {
    height: 42px;
    width: 208px;
    border: 1px solid rgba(234, 236, 241, 0.5);
    border-radius: 4px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel {
    display: flex;
    align-items: center;
    flex-grow: 1;
    cursor: pointer;
    overflow: hidden;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel:hover {
    background: rgba(51, 53, 59, 0.06);
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image {
    position: relative;
    width: 36px;
    height: 36px;
    margin: 2px;
    flex: none;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-wrap {
    width: 100%;
    height: 100%;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-wrap img {
    border-radius: 3px;
    width: 36px;
    height: 36px;
    border: 1px solid #EAECF1;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: #96969b;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-triangle-container {
    position: absolute;
    bottom: 0px;
    right: 0px;
    border-bottom: 12px solid #ffffff;
    border-left: 12px solid transparent;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-triangle-container .property-bar-image-triangle {
    position: absolute;
    font-size: 9px;
    bottom: -13px;
    right: 0px;
    color: black;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-triangle-container-cornericon {
    position: absolute;
    bottom: -2px;
    right: -2px;
    height: 13px;
    width: 13px;
    background: #fff;
    border-radius: 6px;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-triangle-container-cornericon .property-bar-image-triangle {
    position: absolute;
    font-size: 7px;
    bottom: 3px;
    right: 3px;
    transform: scale(1.9);
    color: #f00;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-triangle-container-cornericon .property-bar-image-triangle_error {
    color: #f00;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-triangle-container-cornericon .property-bar-image-triangle_warning {
    color: rgba(255, 200, 0);
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-triangle-container-cornericon .property-bar-image-triangle_normal {
    color: #9B9FAB;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-triangle-container_disabled {
    position: absolute;
    bottom: -1px;
    right: -1px;
    height: 12px;
    width: 12px;
    background: #ffffff;
    border-radius: 10px;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-triangle-container_disabled .property-bar-image-triangle {
    position: absolute;
    bottom: 0px;
    right: 1px;
    color: black;
    font-size: 10px;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-image .property-bar-image-hover-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.3);
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label {
    margin: 0 6px;
    width: 154px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    flex: auto;
    overflow: hidden;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label.short-label {
    width: 118px;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label.mini-label {
    width: 82px;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label .homestyler-smart-text {
    padding: 2px 0;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label .property-bar-image-button-title-label {
    width: 100%;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label .property-bar-image-button-title-label,
.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label .property-bar-image-button-size-label {
    color: #9B9FAB;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label .property-bar-image-button-label-text-container {
    display: flex;
    align-items: center;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label .property-bar-image-button-label-text-container .property-bar-image-button-label-text {
    margin-left: 5px;
    color: #33353B;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .material-reset {
    padding: 0;
    width: 30px;
    min-width: 20px;
    border-radius: 0;
    font-size: 12px;
    line-height: 12px;
    right: 10px;
    height: 40px;
    color: #999;
    white-space: normal;
    cursor: default;
    overflow: hidden;
    position: absolute;
    overflow-wrap: break-word;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label.short-label + .material-reset {
    right: 45px;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label.short-label + .material-reset span {
    border-right: 1px solid #cecece;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label.mini-label + .material-reset {
    right: 80px;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label.mini-label + .material-reset span {
    border-right: 1px solid #cecece;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-button-icon {
    width: 37px;
    height: inherit;
    font-size: 18px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #33353B;
}

.property-bar-image-button .property-bar-image-button-area .property-bar-image-button-icon:hover {
    background: rgba(51, 53, 59, 0.06);
}

.property-bar-image-button .property-bar-image-button-area .split-line::before {
    content: '';
    position: absolute;
    left: 0;
    top: 11px;
    width: 1px;
    height: 20px;
    background-color: #D4D7E1;
}

.property-bar-image-button.disabled .property-bar-image-button-area .property-bar-image-panel {
    cursor: not-allowed;
}

.property-bar-image-button.disabled .property-bar-image-button-area .property-bar-image-panel:hover {
    background-color: #FFFFFF;
}

.property-bar-image-button.disabled .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label .property-bar-image-button-title-label,
.property-bar-image-button.disabled .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label .property-bar-image-button-size-label,
.property-bar-image-button.disabled .property-bar-image-button-area .property-bar-image-panel .property-bar-image-button-label .property-bar-image-button-label-text {
    color: #9B9FAB;
}
`;