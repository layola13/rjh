const styleContent = `.mousetooltip {
    top: 100px;
    left: 100px;
    position: fixed;
    z-index: 2000;
    padding: 5px 10px 5px 10px;
    background: rgba(25, 25, 30, 0.8);
    box-shadow: 0px 0px 8px 0px rgba(25, 25, 50, 0.15);
    border-radius: 2px;
    color: #ffffff;
    border-radius: 4px;
}
.mousetooltip span {
    font-size: 12px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    line-height: 12px;
}
.windowWrapper .closeBtn .hover-image {
    display: none;
}
.createcustomizedmodel .popupwindows {
    border-radius: 8px !important;
}
.createcustomizedmodel .popupwindows .popup-window {
    border-radius: 8px;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px 0px rgba(25, 25, 30, 0.15);
}
.createcustomizedmodel .popupwindows .popup-window .window-header {
    height: 80px;
    line-height: 80px;
    border: none;
}
.createcustomizedmodel .popupwindows .popup-window .window-header .title {
    color: #19191E;
    font-size: 20px;
    padding-top: 12px;
    line-height: 77px;
    font-weight: bold;
}
.createcustomizedmodel .popupwindows .popup-window .window-header .closeBtn {
    top: 14px;
    right: 14px;
}
.createcustomizedmodel .popupwindows .popup-window .window-header .closeBtn img {
    width: 12px;
    height: 12px;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents {
    background: #FFFFFF;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-size-field .model-size-tile {
    margin: 6px 20px;
    line-height: 24px;
    color: #19191E;
    font-size: 14px;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-size-field .modeloutputtogglecontainer {
    margin: 15px 20px 24px;
    font-size: 12px;
    border-radius: 2px;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-size-field .modeloutputtogglecontainer li:first-child {
    border-right: none;
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-size-field .modeloutputtogglecontainer li:last-child {
    border-left: none;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-size-field .modeloutputtogglecontainer .outputitem {
    width: 80px;
    margin-top: 0px;
    line-height: 24px;
    color: #19191E;
    border: 0.5px solid #dcdce1;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-size-field .modeloutputtogglecontainer .outputitem:hover {
    color: #19191E;
    background: #e1ecff;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-size-field .modeloutputtogglecontainer .active {
    color: #FFFFFF;
    border: none;
    background: linear-gradient(#327DFF, #4B96FF);
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-size-field .modeloutputtogglecontainer .active:hover {
    color: #FFFFFF !important;
    background: linear-gradient(#327DFF, #4B96FF) !important;
    border: none !important;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-tile {
    margin: 6px 20px;
    line-height: 24px;
    color: #19191E;
    font-size: 14px;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container {
    margin: 15px 20px;
    display: flex;
    list-style: none;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li {
    width: 124px;
    height: 140px;
    text-align: center;
    line-height: 18px;
    margin-right: 13px;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-image {
    width: 124px;
    height: 90px;
    border-radius: 8px;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-image img {
    width: 120px;
    height: 90px;
    border-radius: 8px;
    border: 2px solid #FFFFFF;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-image.model-image-hover img {
    border: 2px solid #327DFF;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-image-selected {
    position: relative;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-image-selected img {
    border: 2px solid #327DFF;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-image-selected .model-checkbox {
    -moz-appearance: none;
    appearance: none;
    -webkit-appearance: none;
    position: absolute;
    right: -7px;
    top: -7px;
    width: 16px;
    height: 16px;
    background: #327DFF;
    border-radius: 8px;
    margin: unset;
    border: unset;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-image-selected .model-checkbox:after {
    content: "";
    display: inline-block;
    position: relative;
    top: -2px;
    left: 5px;
    width: 6px;
    height: 9px;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-description .model-name {
    line-height: 32px;
    font-size: 12px;
    color: #19191E;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-description .model-tips {
    font-size: 11px;
    color: #808080;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-description-highlight .model-name {
    color: #327dff;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .contentsWrapper .model-type-field .model-type-container .model-view-li .model-description-highlight .model-tips {
    color: #327dff;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .customizedmodel-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-top: 35px;
    cursor: pointer;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .customizedmodel-buttons .createbutton {
    width: 120px;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    background-color: #396efe !important;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .customizedmodel-buttons .createbutton:hover, 
.createcustomizedmodel .popupwindows .popup-window .window-contents .customizedmodel-buttons .createbutton:active {
    background-color: #305dd7 !important;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .customizedmodel-buttons .cancelbutton {
    width: 120px;
    height: 32px;
    line-height: 32px;
    border: 0.5px solid #d9d9d9;
    box-sizing: border-box;
    background-color: #fff !important;
}
.createcustomizedmodel .popupwindows .popup-window .window-contents .customizedmodel-buttons .cancelbutton:hover, 
.createcustomizedmodel .popupwindows .popup-window .window-contents .customizedmodel-buttons .cancelbutton:active {
    border: 0.5px solid #327DFF;
}`;

export default styleContent;