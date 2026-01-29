const cssContent = `.house-type-panel .title {
    display: flex;
    align-items: center;
    margin: 21px 0 13px 18px;
    color: #33353b;
}
.house-type-panel .title .text {
    font-size: 14px;
    font-weight: bold;
    line-height: 14px;
}
.house-type-panel .title .setting {
    position: absolute;
    display: flex;
    align-items: center;
    right: 23px;
    cursor: pointer;
}
.house-type-panel .title .setting:hover .anticon {
    color: #396efe !important;
}
.house-type-panel .title .setting:hover .setting-text {
    color: #396efe;
}
.house-type-panel .title .setting .setting-text {
    font-size: 12px;
    font-weight: 300;
    margin-left: 4px;
}
.house-type-panel .component {
    display: flex;
    flex-wrap: wrap;
    padding-left: 18px;
}
.house-type-panel .component .image-button-edit-model {
    cursor: not-allowed;
}
.house-type-panel .component .freeTrialItem {
    background: linear-gradient(to right, #0b51ff, #e318b4);
    color: white;
    border-radius: 9px 2px 9px 2px;
    width: -moz-max-content;
    width: max-content;
    height: 18px;
    background-size: 100% 18px;
    text-align: center;
    line-height: 18px;
    font-weight: 600;
    box-sizing: content-box !important;
    cursor: pointer;
    position: absolute;
    margin-top: -99px;
    padding: 0 5px;
}
.house-type-panel .component .vipIcon {
    width: 23px;
    height: 18px;
    cursor: pointer;
    position: relative;
    transform: translate(50px, -93px);
}
.house-type-panel-edit-model {
    filter: opacity(40%);
    pointer-events: none;
}
.global-en .house-type-panel .component .freeTrialItem {
    background: url(${backgroundImageUrl}) center no-repeat;
    color: black;
}`;

export { cssContent };