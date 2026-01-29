const cssContent = `.render-zoom-btn-container {
            
 position: absolute;
 bottom: 18px;
 width: 200px;
 height: 40px;
 left: calc(50% - 100px);
 z-index: 1;
 display: flex;
 justify-content: flex-start;
 align-items: center;
 background: rgba(25, 25, 30, 0.5);
 border-radius: 2px;

}
.render-zoom-btn-container .ant-slider {
 display: flex;
 align-items: center;

}
.render-zoom-btn-container .ant-slider .ant-slider-handle {
 margin-top: 0px;
 width: 10px;
 height: 10px;
 border: 0;

}
.render-zoom-btn-container .ant-slider .ant-slider-handle:hover {
 transform: none;
}
.render-zoom-btn-container .ant-slider .ant-slider-handle:active {
 box-shadow: none;
}
.render-zoom-btn-container .ant-slider .ant-slider-rail {
 height: 2px;
 background: #dcdce1;
}
.render-zoom-btn-container .ant-slider .ant-slider-track {
 height: 2px;
 background: linear-gradient(270deg, #8cb9ff 0%, #4b96ff 100%);

}
.render-zoom-btn-container .zoom-slider.ant-slider {
 width: 70px;
 margin: 10px 5px;

}
.render-zoom-btn-container .zoom-btn.ant-btn-clicked:after {
 border: 0 solid #777;

}
.render-zoom-btn-container .zoom-btn .ant-btn, 
.render-zoom-btn-container .zoom-btn.ant-btn {
 margin: 0;
 width: 40px!important;
 height: 40px!important;
 padding: 0;
 border-radius: 0;
 background-color: transparent;
 border: none !important;
 box-shadow: none;

}
.render-zoom-btn-container .zoom-btn .ant-btn i, 
.render-zoom-btn-container .zoom-btn.ant-btn i {
 font-size: 24px;
 color: rgba(255, 255, 255, 0.7);

}
.render-zoom-btn-container .zoom-btn .ant-btn:focus, 
.render-zoom-btn-container .zoom-btn.ant-btn:focus {
 background-color: transparent;

}
.render-zoom-btn-container .zoom-btn .ant-btn:hover, 
.render-zoom-btn-container .zoom-btn.ant-btn:hover {
 background-color: rgba(25, 25, 30, 0.7);

}
.render-zoom-btn-container .zoom-btn .ant-btn:hover i, 
.render-zoom-btn-container .zoom-btn.ant-btn:hover i {
 color: #fff;

}
.render-zoom-btn-container .zoom-btn .ant-btn[disabled], 
.render-zoom-btn-container .zoom-btn.ant-btn[disabled] {
 background-color: transparent!important;

}
.image-detail-zoom {
 width: 100%;
 height: 100%;
 overflow: hidden;
 position: absolute;

}
.image-detail-zoom .enlarge {
 display: flex;
 position: absolute;
 right: 104px;
 top: 38px;
 z-index: 5;

}
.image-detail-zoom .enlarge .enlarge-control, 
.image-detail-zoom .enlarge .enlarge-origin {
 display: inline-block;
 vertical-align: middle;
 background-color: rgba(196, 196, 196, 0.6);
 border-radius: 15px;
 line-height: 29px;
 height: 30px;
 color: #33353b;
 text-align: center;
 font-size: 12px;
 cursor: pointer;

}
.image-detail-zoom .enlarge .enlarge-control {
 width: 110px;
 margin-right: 12px;
 display: inline-flex;
 align-items: center;
 justify-content: center;

}
.image-detail-zoom .enlarge .enlarge-jian-disable, 
.image-detail-zoom .enlarge .enlarge-jia-disable {
 opacity: 0.4;

}
.image-detail-zoom .enlarge .enlarge-text {
 vertical-align: middle;
 font-size: 14px;
 display: inline-block;
 width: 61px;

}
.image-detail-zoom .enlarge .enlarge-origin {
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 0 10px;

}
.image-detail-zoom .enlarge .enlarge-origin .hs-iconfont-view {
 margin-right: 4px;

}
`;

export default cssContent;