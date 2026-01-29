const cssContent = `.share-case-page {
    position: relative;
    height: 100vh;
}
.share-case-page .share-case-overlay {
    background: none repeat scroll 0 0 #000;
    height: 100%;
    left: 0;
    filter: alpha(opacity=30);
    -moz-opacity: 0.3;
    -khtml-opacity: 0.3;
    opacity: 0.3;
    position: fixed;
    width: 100%;
    z-index: 3002;
}
.share-case-page .share-case-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 380px;
    margin-top: -100px;
    margin-left: -250px;
    padding: 22px 32px 26px;
    border-radius: 8px;
    box-shadow: 0 4px 16px 0 rgba(25, 25, 30, 0.15);
    background-color: #fff;
    z-index: 3003;
}
.share-case-page .share-case-content .header {
    text-align: center;
    position: relative;
    margin-bottom: 26px;
}
.share-case-page .share-case-content .header .title {
    line-height: 20px;
    color: #19191E;
    font-size: 20px;
    text-align: center;
}
.share-case-page .share-case-content .header .close-image {
    position: absolute;
    top: 0;
    right: -14px;
    width: 14px;
    cursor: pointer;
}
.share-case-page .share-case-content .header .hover-image {
    display: none;
}
.share-case-page .share-case-content .checkbox .ant-radio-group label:last-child {
    margin-left: 26px;
}
.share-case-page .share-case-content .checkbox .ant-radio-wrapper {
    font-size: 14px;
}
.share-case-page .share-case-content .checkbox .span-color-selected {
    color: #108ee9;
}
.share-case-page .share-case-content .share-url-area {
    display: flex;
}
.share-case-page .share-case-content .share-url-area .url-input {
    flex: auto;
    font-size: 12px;
    padding: 8px 3px;
    width: 275px;
    border-radius: 6px 0 0 6px;
}
.share-case-page .share-case-content .share-url-area .copy-span {
    flex: none;
    font-size: 12px;
    background-color: #108CFF;
    padding: 0px 17px;
    border-radius: 0 6px 6px 0;
    color: #fff;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
}
.share-case-page .share-case-content .share-tips {
    font-size: 13px;
    line-height: 16px;
    color: #60646F;
    margin-top: 11px;
}`;

export default cssContent;