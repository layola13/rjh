const cssContent = `@font-face {
    font-family: 'icomoon';
    src: url(${require('./fonts/icomoon.eot')});
    src: url(${require('./fonts/icomoon.eot')}) format('embedded-opentype'), url(${require('./fonts/icomoon.woff')}) format('woff'), url(${require('./fonts/icomoon.ttf')}) format('truetype'), url(${require('./fonts/icomoon.svg')}#icomoon) format('svg');
    font-weight: normal;
    font-style: normal;
}
.fullcover {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    z-index: 12000;
}
.fullcover.greycolor {
    background: rgba(0, 0, 0, 0.2);
}
.pagecenter {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -35px;
    margin-left: -35px;
    z-index: 10001;
}
.loadingsvg {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 840px;
    height: 400px;
    z-index: 12001;
    margin-top: -200px;
    margin-left: -420px;
}
.loadingsvg svg {
    position: absolute;
    top: 21px;
    left: 30px;
    width: 100px;
    height: 105px;
}
.loader {
    border-top: 5px solid rgba(0, 0, 0, 0.1);
    border-right: 5px solid rgba(0, 0, 0, 0.1);
    border-bottom: 5px solid rgba(0, 0, 0, 0.1);
    border-left: 5px solid #237ab9;
}
.homestyler_text {
    font-size: 29px;
    font-weight: bold;
    color: #888;
    width: 382px;
    text-align: center;
    text-transform: uppercase;
    line-height: 36px;
    position: absolute;
    left: 50%;
    margin-left: -191px;
    margin-top: 78px;
}
.loader, 
.loader:after {
    border-radius: 50%;
    width: 150px;
    height: 150px;
}
.rotatesvgtarget {
    text-align: center;
    background: transparent;
}
.panelcenter {
    position: absolute;
    top: 46%;
    z-index: 1;
    left: 46%;
}
.panelcenter img {
    animation: rotateit 1.5s linear infinite;
}
.containercenter {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
}
.containerleft {
    position: absolute;
    top: 50%;
    left: 2px;
    margin-top: -15px;
}
.rotatesvgtarget span {
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    display: inline-block;
    font-size: 35px;
    line-height: 1;
    animation: rotateit 1.5s linear infinite;
    color: #fff;
}
.pagecenter.rotatesvgtarget span {
    font-size: 70px;
}
.rotatesvgtarget span:before {
    content: "\\e001";
}
@keyframes rotateit {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.loader {
    animation: rotateit 1.1s linear infinite;
}
.load-container img {
    width: 665px;
    height: 100%;
}
.panelcenter span {
    width: 50px;
    height: 50px;
    font-size: 50px;
}
.panelcenter img {
    width: 40px;
}
.containercenter span, 
.containerleft span {
    width: 30px;
    height: 30px;
    font-size: 30px;
}
.imgplaceholder {
    background-image: url(${require('./images/placeholder.png')});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 35% 35%;
    background-color: #e3e3e3;
    display: inline-block;
}
.cantshowimg {
    background-image: url(${require('./images/cant-show.png')});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 35% 35%;
    background-color: #e3e3e3;
    display: inline-block;
}
.noimg {
    background-image: url(${require('./images/cant-show.png')});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 40%;
    background-color: #e3e3e3;
    display: inline-block;
}
.loading2dcontentcolor {
    fill: rgba(210, 210, 210, 0.9);
}
.progress-indicator {
    width: 50%;
    margin: 0px auto;
}
.progress-indicator .progress {
    margin-bottom: 5%;
    height: 6px;
    margin-top: 50%;
    background-color: #f3f3f3;
    box-shadow: inset 0px 1px 1px 0px rgba(74, 77, 83, 0.51);
}
.progress-indicator .progress .progress-bar-info {
    background-color: #55acee;
    box-shadow: inset 0px 1px 1px 0px rgba(74, 77, 83, 0.51);
}
.progress-indicator .progress-failed {
    margin-top: 50%;
}
.progress-indicator .progress-failed svg {
    height: 20%;
    width: 20%;
}
.progress-indicator .progress-failed svg path {
    fill: #fff;
}
.progress-indicator .statustext {
    text-align: center;
    height: 20px;
    display: block;
    line-height: 20px;
    width: 100%;
    font-size: 12px;
    color: #55acee;
}`;

export default cssContent;