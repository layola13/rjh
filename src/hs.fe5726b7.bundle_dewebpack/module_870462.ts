const styles = `.notificationpopupwrapper {
    position: absolute;
    z-index: 100001;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.notificationpopupwrapper.hidden {
    display: none;
}
.notificationpopupwrapper .mask {
    background: none repeat scroll 0 0 #000;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0.3;
    position: fixed;
    z-index: 110;
}
.notificationpopupwrapper .notificationpopup {
    width: 500px;
    position: relative;
    background-color: #f7f7f7;
    overflow: hidden;
    z-index: 1001;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
}
.notificationpopupwrapper .notificationpopup .header {
    height: 40px;
    position: relative;
}
.notificationpopupwrapper .notificationpopup .header .closebtn {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
}
.notificationpopupwrapper .notificationpopup .content {
    padding: 10px 30px;
}
.notificationpopupwrapper .notificationpopup .content .image {
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
}
.notificationpopupwrapper .notificationpopup .content .text {
    display: inline-block;
    margin-left: 20px;
    font-size: 14px;
    color: #343A40;
    line-height: 1.4;
}
.notificationpopupwrapper .notificationpopup .content.noicon .image {
    display: none;
}
.notificationpopupwrapper .notificationpopup .content.noicon .text {
    font-size: 14px;
    color: #343A40;
    line-height: 1.4;
}
.notificationpopupwrapper .notificationpopup .actions {
    padding: 20px;
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;
}
.notificationpopupwrapper .notificationpopup .actions .notification-btn {
    padding: 6px;
    min-width: 100px;
    border: 1px solid #aaa;
    border-radius: 2px;
    font-size: 14px;
    text-align: center;
    color: #19191E;
    cursor: pointer;
}`;

export default styles;