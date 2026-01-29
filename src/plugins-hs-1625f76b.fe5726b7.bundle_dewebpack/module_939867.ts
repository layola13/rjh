const styles = `.catalogLibContainer {
    position: absolute;
    font-size: 12px;
    top: 50px;
    height: calc(100vh - 60px);
    color: black;
    z-index: 102;
}
.catalogZIndex {
    z-index: 2000 !important;
}
.catalogIndependentContainer {
    font-size: 12px;
    height: calc(100% - 60px);
    color: black;
}
.catalogFavListPanel {
    position: fixed;
    top: 60px;
    left: 60px;
    z-index: 2410;
}
.homestyler-ui-components.homestyler-popover-item.catalogToolTipArea {
    background: #396EFE;
    padding: 0;
    border-radius: 8px;
    width: -moz-max-content;
    width: max-content;
}
.homestyler-ui-components.homestyler-popover-item.catalogToolTipArea .tool-tip-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    font-size: 14px;
    padding: 1.1px 0;
}
.homestyler-ui-components.homestyler-popover-item.catalogToolTipArea .tool-tip-area .tool-tip-title {
    color: #FFFFFF;
    margin-right: 10px;
    font-family: AlibabaPuHuiTi-Bold !important;
}
.homestyler-ui-components.homestyler-popover-item.catalogToolTipArea .homestyler-popover-caret {
    border-bottom-color: #396EFE;
}`;

export default styles;