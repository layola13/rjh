const cssContent = `.modal-browser-reminder {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 110001;
}
.modal-browser-reminder .reminder-dialog {
    width: 450px;
    height: 200px;
    margin: 300px auto;
    box-shadow: 0 0 8px 0 rgba(52, 58, 64, 0.25);
    border-radius: 8px;
    background-color: #fff;
    animation: zoom 0.6s;
    position: relative;
}
.modal-browser-reminder .reminder-dialog .close {
    margin-right: 15px;
    margin-top: 15px;
    font-size: 16px;
    font-weight: normal;
}
.modal-browser-reminder .reminder-dialog .reminder-text-recommendation-font {
    position: absolute;
    width: 400px;
    letter-spacing: 0.4px;
    font-size: 12px;
    line-height: 1.4;
    margin-top: 40px;
    margin-left: 25px;
}
.modal-browser-reminder .reminder-dialog .button-line {
    position: absolute;
    text-align: center;
    top: 130px;
    left: 80px;
}
.modal-browser-reminder .reminder-dialog .button-line .button-download-chrome,
.modal-browser-reminder .reminder-dialog .button-line .button-download-client {
    width: 140px;
    height: 30px;
    border-radius: 4px;
    padding: 0 4px;
    background: #FFFFFF;
    border: 1px solid #2e92de;
    text-align: center;
    font-family: PingFang-SC;
    font-size: 12px;
    color: #2e92de;
    display: inline-block;
    line-height: 30px;
    cursor: pointer;
}
.modal-browser-reminder .reminder-dialog .button-line .button-download-chrome.ihome,
.modal-browser-reminder .reminder-dialog .button-line .button-download-client.ihome {
    margin-left: 70px;
}
.modal-browser-reminder .reminder-dialog .button-line .button-download-client {
    margin-left: 30px;
    width: 150px;
}
.global-en .modal-browser-reminder .reminder-dialog .button-line {
    left: 260px;
}`;

export default cssContent;