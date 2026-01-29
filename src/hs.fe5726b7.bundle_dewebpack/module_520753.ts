const cssContent = `#login-panel-container {
    width: 980px;
    height: 594px;
    padding: 0px;
}
#login-panel-container .login-panel {
    position: absolute;
    z-index: 10000;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
}
#login-panel-container .login-panel .login-overlay {
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0.3;
    position: fixed;
}
#login-panel-container .login-panel .login-body {
    z-index: 10001;
    display: block;
    min-height: 500px;
    width: 858px;
    position: absolute;
    overflow: hidden;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.1);
}
#login-panel-container .login-panel .login-body .left {
    display: block;
    float: left;
    width: 394px;
    position: relative;
    font-size: 0;
}
#login-panel-container .login-panel .login-body .left img {
    height: 100%;
    width: 394px;
}
#login-panel-container .login-panel .login-body .left .get-more-a {
    color: #108CFF;
    position: absolute;
    bottom: 35px;
    right: 162px;
}
#login-panel-container .login-panel .login-body .left .get-more-a .get-more-span {
    font-size: 14px;
    color: #108CFF;
    line-height: 20px;
}
#login-panel-container .login-panel .login-body .left .get-more-a .get-more-img {
    width: 18px;
    height: 18px;
    position: relative;
    left: 5px;
    top: 4px;
}
#login-panel-container .login-panel .login-body .right {
    float: right;
    width: 360px;
    margin-left: 196px;
    padding-top: 64px;
    box-shadow: none;
    position: absolute;
    top: 50%;
    left: 50%;
    min-height: 450px;
    max-width: 100%;
    min-width: 365px;
    transform: translate(-50%, -50%);
    text-align: center;
    background: #fff;
}
#login-panel-container .login-panel .login-body .login-iframe {
    border-style: none;
}
#login-panel-container .login-panel .global-body {
    z-index: 10001;
    display: block;
    position: absolute;
    overflow: hidden;
    border-radius: 10px;
    background-color: #Fff;
    box-shadow: #aaa 0 0 20px 0;
}
#login-panel-container .login-panel .global-body .login-iframe {
    width: 360px;
    min-height: 630px;
}
#logining-popup {
    width: 390px;
    height: 589px;
}
#logining-popup #main {
    display: block;
    min-height: 500px;
    width: 390px;
    position: absolute;
    overflow: hidden;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: #aaa 0 0 20px 0;
}
#logining-popup #main .left {
    display: block;
    width: 390px;
    position: relative;
    font-size: 0;
}
#logining-popup #main .left .left-bg {
    height: 100%;
    width: 394px;
}
#logining-popup #main .left .get-more-a {
    color: #108CFF;
    position: absolute;
    bottom: 35px;
    right: 162px;
}
#logining-popup #main .left .get-more-a .get-more-span {
    font-size: 14px;
    color: #108CFF;
    line-height: 20px;
}
#logining-popup #main .left .get-more-a .get-more-img {
    height: 18px;
    position: relative;
    left: 5px;
    top: 4px;
}
#logining-popup #main .right {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 360px;
    min-height: 477px;
    transform: translate(-50%, -50%);
    text-align: center;
    box-shadow: none;
}
#logining-popup #main .right .title {
    visibility: hidden !important;
    margin-bottom: 22px;
    line-height: 32px;
    font-size: 20px;
    color: #333;
    font-weight: 500;
}
#logining-popup #main .right .taobao-loginBtn {
    box-sizing: content-box;
    width: 242px;
    height: 17px;
    padding: 10px 14px;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 4px;
    display: inline-block;
    font-size: 15px;
    transition: all 0.2s;
    color: #ff4300;
    background: #fff;
    border: 1px solid #ff4300;
    outline: none;
}
#logining-popup #main .right .taobao-loginBtn:hover {
    transition: all 0.1s;
    color: #ffffff;
    background: #F52B00 !important;
}
#logining-popup #main .right .taobao-login-content {
    padding: 10px 14px;
    margin: 0 auto;
    width: 280px;
    border-radius: 4px;
    display: inline-block;
    font-size: 15px;
    transition: all 0.2s;
    color: #ff4300;
    background: #fff;
    border: 1px solid #ff4300;
    outline: none;
    line-height: 25px;
}
#logining-popup-tip {
    display: block;
    min-height: 300px;
    width: 500px;
    left: calc((100% - 150px) / 2) !important;
    top: 200%;
    position: absolute;
    overflow: hidden;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: #aaa 0 0 20px 0;
}
#logining-popup-tip #main {
    text-align: center;
    padding: 76px 108px;
}
#logining-popup-tip #main .img {
    margin-bottom: 16px;
}
#logining-popup-tip #main .content {
    color: #3C3C3C;
    font-size: 14px;
    line-height: 20px;
}
.ezhomebackground {
    background-color: transparent !important;
}
.ezhomebackgroundimge {
    background-color: transparent !important;
}
.ezhome-modal {
    left: calc((100% - 980px) / 2) !important;
    top: calc((100% - 594px) / 2) !important;
}
.ezhome-taobao-modal {
    left: calc((100% - 438px) / 2) !important;
    top: calc((100% - 623px) / 2) !important;
}
.propertybar {
    background: #f7f7f7;
}`;

export default cssContent;