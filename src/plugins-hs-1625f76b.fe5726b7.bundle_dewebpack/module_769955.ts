const cssContent = `#cameraposition_overlay {
    visibility: hidden;
    left: 0px;
    width: 100%;
    z-index: 300;
}
#np_navigator {
    position: absolute;
    margin-left: 0.5%;
    bottom: 60px;
    width: 99%;
    background-color: #fff;
    z-index: 3001;
    box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}
#np_navigator img:hover {
    cursor: pointer;
}
#np_navigator #createcamera {
    right: 0;
    width: 180px;
    height: 100%;
    float: right;
}
#np_navigator .ver_line {
    width: 1px;
    height: 144px;
    background: transparent;
    float: right;
    position: relative;
    right: 156px;
    margin-top: 18px;
}
#np_navigator .createbtn {
    margin: 18px 12px 18px 4px;
    width: 144px;
    height: 144px;
    float: right;
    cursor: pointer;
    position: relative;
    text-align: center;
    background: #F2F2F2;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#np_navigator .createbtn .create-icon {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
#np_navigator .createbtn:hover .create-icon .hs-iconfont-view .hover-icon-bg .anticon {
    color: #396EFE !important;
}
#np_navigator .createbtn:hover .ctext {
    color: #396EFE;
}
#np_navigator .createbtn-disable {
    cursor: not-allowed;
    filter: opacity(0.4);
}
#np_navigator .createbtn-disable > div {
    pointer-events: none !important;
}
#np_navigator .createbtn-disable:hover .create-icon .hs-iconfont-view .hover-icon-bg .anticon {
    color: #33353B !important;
}
#np_navigator .createbtn-disable:hover .ctext {
    color: unset !important;
}
#np_navigator .createbtn .ctext {
    font-size: 14px;
    color: #33353B;
}
#np_navigator .createbtn .create-loading {
    cursor: not-allowed;
    opacity: 1;
    position: relative;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 0;
}
#np_navigator .createbtn .create-loading.animate {
    animation: rotateit 1.5s linear infinite;
}
#cameraposition_overlay.visible {
    visibility: visible;
}`;

export default cssContent;