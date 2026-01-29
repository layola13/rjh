const cssContent = `.pricing-iframe-dialog .ant-modal {
    transition: width 200ms ease;
}
.pricing-iframe-dialog.hide-close-btn .ant-modal-close {
    display: none;
}
.pricing-iframe-dialog .ant-modal-close {
    top: 30px;
    right: 30px;
}
.pricing-iframe-dialog .ant-modal-close-x {
    color: #fff;
    font-size: 18px;
    font-weight: 100;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
}
.pricing-iframe-dialog .ant-modal-close-x:hover {
    background-color: rgba(0, 0, 0, 0.2);
}
.pricing-iframe-dialog .ant-modal-content {
    border-radius: 10px;
}
.pricing-iframe-dialog .ant-modal-body {
    padding: 0;
    height: 550px;
}
.ezhome-pricing-iframe-wrapper {
    border-radius: 10px;
    overflow: hidden;
}
.ezhome-pricing-iframe-wrapper .pricing-iframe {
    width: 100%;
    height: 550px;
}
.ezhome-pricing-iframe-wrapper .pricing-loading-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}`;

export default cssContent;