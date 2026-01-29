const styles = `.container .export-svg-dialog-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    border-top: 1px solid #E7E7E7;
    height: 200px;
    background: #ffffff;
    z-index: 102;
}
.container .export-svg-dialog-wrapper .export-svg-dialog {
    margin-top: 15px;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-tit {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 2px solid #E7E7E7;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-con {
    margin-top: 20px;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-con .export-svg-con-left, 
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-con .export-svg-con-right {
    width: 50%;
    float: left;
    text-align: center;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-con .export-svg-con-left .svg-img, 
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-con .export-svg-con-right .svg-img {
    width: 100px;
    height: 100px;
    margin: 0 auto;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-con .export-svg-con-left .svg-txt, 
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-con .export-svg-con-right .svg-txt {
    margin-top: 20px;
    height: 20px;
    line-height: 20px;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-con input {
    font-size: 16px;
    margin-right: 10px;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-bottom {
    margin-top: 5px;
    margin-bottom: 20px;
    margin-left: 90px;
    width: 73%;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-bottom .export-svg-bot-left, 
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-bottom .export-svg-bot-right {
    float: left;
    width: 37%;
    text-align: center;
    margin-top: 20px;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-bottom .export-svg-bot-left .export-btn, 
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-bottom .export-svg-bot-right .export-btn {
    display: inline-block;
    width: 80px;
    line-height: 30px;
    border-radius: 5px;
    border: 1px solid #E7E7E7;
    font-size: 14px;
    cursor: pointer;
}
.container .export-svg-dialog-wrapper .export-svg-dialog .export-svg-dialog-bottom .export-svg-bot-right .export-btn {
    color: #ffffff;
    background: #6199D1;
}
.clearfix:after {
    content: "020";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix {
    zoom: 1;
}`;

export default styles;