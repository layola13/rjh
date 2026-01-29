const styles = `#totalOverlay {
    background: none repeat scroll 0 0 #000;
    height: 100%;
    left: 0;
    filter: alpha(opacity=30);
    -moz-opacity: 0.3;
    -khtml-opacity: 0.3;
    opacity: 0.3;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 110;
}
.popupwindows {
    display: none;
    background-color: #fff;
    overflow: hidden;
    position: absolute;
    z-index: 210;
    top: 9%;
}
.windowWrapper {
    padding: 0;
    margin: 0;
    background-color: #fff;
    width: 100%;
    height: 100%;
}
.windowHeader {
    position: relative;
    top: 0px;
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    border-bottom: 1px solid #e3e3e3;
    text-align: center;
}
.windowHeader h2.title {
    font-size: 22px;
    color: #333333;
    float: left;
    font-weight: normal;
    line-height: 50px;
    text-align: center;
    width: 100%;
    padding: 0px;
    margin: 0px;
}
.calculatewholebrick .windowHeader {
    border-radius: 4px 4px 0px 0px;
}
.calculatewholebrick .windowHeader h2.title {
    text-align: center;
    margin-left: 10px;
}
.windowHeader span.closeBtn {
    width: 50px;
    height: 30px;
    border-left: 1px solid #cfcfcf;
    line-height: 30px;
    position: absolute;
    top: 36%;
    transform: translateY(-50%);
    font-weight: normal;
    right: 24px;
}
.windowHeader span.closeBtn a {
    color: #666;
    font-size: 18px;
    cursor: pointer;
}
.windowHeader span.closeBtn a:hover {
    color: #333 !important;
}
.windowContents {
    clear: both;
    float: left;
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    color: #a7a7a7;
    font-size: 15px;
    padding-top: 17px;
}
#customWindow,
#userRegisterWindow,
#resetPwdWindow,
#userLoginWindow {
    display: block;
}
#userRegisterWindow .windowContents {
    padding-top: 5px;
}
.contentsWrapper {
    width: 100%;
    height: 100%;
}
#customWindow,
#confirmBox {
    height: 210px;
    width: 400px;
}
#customWindow .windowfooter {
    position: absolute;
    bottom: 30px;
    left: 14%;
}
#confirmBox .windowfooter {
    position: absolute;
    bottom: 30px;
    left: 20%;
}
#confirmBox .windowfooter .btn-default {
    position: relative;
    left: 10%;
}
#customWindow .windowHeader,
#confirmBox .windowHeader {
    height: 48px;
    line-height: 48px;
}
#customWindow .windowHeader span.closeBtn,
#confirmBox .windowHeader span.closeBtn {
    top: 10px;
}
#customWindow .contentsWrapper,
#confirmBox .contentsWrapper {
    width: 320px;
    line-height: 24px;
    color: #808080;
}
#customWindow .windowfooter .btn,
#confirmBox .windowfooter .btn {
    width: 80px;
}
.contentsWrapper {
    -webkit-user-select: text;
    -moz-user-select: text;
    -o-user-select: text;
    user-select: text;
}
.designthumbnail img {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    width: 100%;
}`;

export default styles;