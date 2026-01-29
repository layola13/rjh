const cssContent = `.renderpreviewwidget-wrapper {
    position: relative;
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.renderpreviewwidget-wrapper .renderpreviewwidget-center {
    width: 26px;
    height: 26px;
    cursor: pointer;
}
.renderpreviewwidget-wrapper .renderpreviewwidget-center .renderpreviewwidget-image {
    width: 26px;
    height: 26px;
}
.renderpreviewwidget-wrapper .renderpreviewwidget-center .renderpreviewwidget-triangle {
    width: 0;
    height: 0px;
    display: block;
    margin-top: -8px;
    margin-left: 20px;
    border-bottom: 4px solid #19191e;
    border-left: 4px solid transparent;
}
.render-preview-dialog .ant-modal-close-x {
    color: #ffffff;
    font-size: 20px;
    font-weight: 100;
}
.render-preview-dialog .ant-modal-close-x:hover {
    color: #327dff;
}
.render-preview-dialog .ant-modal-content {
    background-color: #323237;
}
.render-preview-dialog .ant-modal-header {
    background-color: initial;
    border-bottom: none;
}
.render-preview-dialog .ant-modal-title {
    text-align: center;
    font-size: 20px;
    color: #ffffff;
    font-weight: 500;
}
.render-preview-dialog .ant-modal-body {
    padding: 0;
}
.render-preview-dialog .render-preview-dialog-content {
    display: flex;
    justify-content: center;
    align-items: center;
}
.render-preview-dialog .render-preview-dialog-img-container {
    position: relative;
    width: auto;
}
.render-preview-dialog .render-preview-dialog-img {
    height: 450px;
    vertical-align: middle;
}
.render-preview-dialog .pano-preview-viewer {
    width: 800px;
    height: 450px;
}
.render-preview-dialog .render-preview-dialog-notice {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
}
.render-preview-dialog .render-preview-dialog-notice > * {
    vertical-align: middle;
}
.render-preview-dialog .render-preview-dialog-notice span {
    color: #959595;
    margin-left: 8px;
}
.render-component-button-popover {
    z-index: auto;
}
.render-component-button-popover .ant-popover-inner-content {
    padding: 0;
}
.render-preview-tips-img-container {
    width: 168px;
    height: 98px;
    text-align: center;
    pointer-events: none;
}
.render-preview-tips-img-padding {
    pointer-events: auto;
    padding: 4px;
    border-radius: 2px;
    background: #ffffff;
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: calc(100% - 4px);
}
.render-preview-tips-img {
    height: 90px;
    vertical-align: middle;
}
.render-preview-tips-close {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 15px;
    height: 15px;
}
.render-submit-preview-tips {
    z-index: 3003;
}
.render-submit-preview-tips .ant-popover-inner {
    background-color: initial;
    box-shadow: initial;
}`;

export default cssContent;