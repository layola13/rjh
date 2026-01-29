export const carouselPanelStyles = `
.carousel-panel-container {
    padding: 0 9px 10px 9px;
    position: fixed;
    z-index: 1001;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);
}

.carousel-panel-container .carousel-panel-header {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.carousel-panel-container .carousel-panel-title {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #343a40;
}

.carousel-panel-container .carousel-panel-content {
    margin-bottom: 12px;
}

.carousel-panel-container .carousel-panel-footer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel-panel-container .carousel-panel-footer.A {
    justify-content: space-between;
}

.carousel-panel-container .carousel-panel-footer.A .homestyler-ui-components.ant-btn {
    min-width: 200px;
    background: #1c1c1c;
    color: white;
    min-width: 176px;
}

.carousel-panel-container .carousel-panel-footer.ezhome {
    justify-content: center;
}

.carousel-panel-container .carousel-panel-footer.ezhome .homestyler-ui-components.ant-btn {
    min-width: 200px;
    background: #396EFE;
    color: white;
    min-width: 176px;
}

.carousel-panel-container .carousel-panel-footer .unlock-block {
    height: 38px;
    background-image: linear-gradient(-52deg, #E0FFA2 0%, #FCFFB3 52%, #FFDF77 100%);
    border-radius: 19px;
    padding: 0 6px 0 12px;
    display: flex;
    align-items: center;
}

.carousel-panel-container .carousel-panel-footer .unlock-block .unlock-text {
    font-size: 12px;
    color: #33353B;
    font-weight: 700;
    margin: 0 8px 0 5px;
}

.carousel-panel-container .carousel-panel-footer .unlock-block .unlock-btn {
    background-color: #1C1C1C;
    color: #FFF;
    font-size: 12px;
    font-family: AlibabaPuHuiTi-Bold !important;
    border-radius: 14px;
    height: 26px;
    line-height: 26px;
    padding: 0 10px;
    cursor: pointer;
    min-width: 80px;
    text-align: center;
}

.carousel-panel-container .carousel-panel-footer .unlock-block .unlock-btn:hover {
    background-color: #333333;
}

.carousel-panel-container .carousel-panel-footer .unlock-block .unlock-btn + .unlock-btn {
    margin-left: 6px;
}

.carousel-panel-container .carousel-panel-footer .unlock-block.unlock-block-a {
    min-width: 182px;
    justify-content: center;
}

.carousel-panel-container .carousel-panel-footer .unlock-block.unlock-block-a .unlock-btn {
    background-color: unset;
    color: #1c1c1c;
    min-width: unset;
    text-align: center;
    margin-left: 8px;
    padding: unset;
}

.carousel-panel-container .carousel-panel-footer .homestyler-ui-components span {
    font-size: 13px;
    font-weight: bolder;
}

.carousel-panel-container .carousel-panel-footer .homestyler-ui-components.ant-btn-default:not(:first-child):hover,
.carousel-panel-container .carousel-panel-footer .homestyler-ui-components.ant-btn-default:not(:first-child):active {
    background: #396efe;
    color: #ffffff;
}

.carousel-panel-container .carousel-panel-footer .homestyler-ui-components:first-child {
    background: #396efe;
    color: #ffffff;
}

.carousel-panel-container .carousel-panel-footer .homestyler-ui-components:first-child:hover {
    background: #305DD7;
}

.carousel-panel-container .carousel-panel-footer .homestyler-ui-components:not(:last-child) {
    margin-right: 9px;
}

.carousel-panel-container .color-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 18px;
    background: #EEEFF2;
    border-radius: 12px;
    padding: 14px 24px 16px 16px;
    cursor: pointer;
}

.carousel-panel-container .color-container .left .text {
    font-size: 12px;
    margin-bottom: 8px;
}

.carousel-panel-container .color-container .left .color-list {
    display: flex;
    border-radius: 4px;
    overflow: hidden;
}

.carousel-panel-container .color-container .left .color-list .color-block {
    width: 45px;
    height: 30px;
}

.carousel-panel-container .color-container .more {
    display: flex;
    font-size: 14px;
    font-family: AlibabaPuHuiTi-Bold !important;
}

.carousel-panel-container .color-container .more .text {
    margin-right: 5px;
    max-width: 112px;
}

.carousel-panel-container .color-container.color-container-a {
    background: unset;
    padding: 0;
    margin-top: 0;
}

.carousel-panel-container .color-container.color-container-a .left .text-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.carousel-panel-container .color-container.color-container-a .left .text-container .text {
    margin-bottom: 0;
    font-family: 'AlibabaPuHuiTi-Bold';
}

.carousel-panel-container .color-container.color-container-a .left .text-container .text-right {
    display: flex;
    align-items: center;
}

.carousel-panel-container .color-container.color-container-a .left .text-container .text-right .text {
    font-family: unset;
}

.carousel-panel-container .color-container.color-container-a .left .text-container .hsc-iconfont-view {
    transform: rotate(90deg);
}

.carousel-panel-container .color-container.color-container-a .left .color-list .color-block {
    width: 36px;
    height: 28px;
}
`;