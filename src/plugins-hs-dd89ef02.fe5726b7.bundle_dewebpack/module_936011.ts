const styles = `
.cad-setting-dialog-wrapper .cad-setting-dialog-overLay {
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: visible;
    top: 0;
    left: 0;
    z-index: 1130;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main {
    background-color: #FFF;
    color: #000;
    width: 500px;
    height: 550px;
    z-index: 1140;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    flex-direction: column;
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-head {
    width: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 40px 22px 30px;
    box-sizing: border-box;
    background-image: linear-gradient(#FFF, #FDFDFD);
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-head .cad-setting-dialog-title {
    font-family: 'AlibabaPuHuiTi-Bold' !important;
    font-size: 20px;
    color: #33353B;
    height: 60px;
    line-height: 60px;
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-content {
    width: 100%;
    height: 374px;
    background-color: #FDFDFD;
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-content .cad-setting-scrollbar {
    width: 460px;
    margin: 0 20px;
    background-image: linear-gradient(to right, #FDFDFD, #F9F9F9, #FDFDFD);
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-bottom {
    height: 80px;
    width: 100%;
    padding: 22px 30px 10px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: row-reverse;
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-bottom .cad-setting-dialog-button {
    width: auto;
    min-width: 100px;
    height: 36px;
    font-size: 13px;
    font-family: 'AlibabaPuHuiTi-Bold';
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-bottom .cad-setting-dialog-button-save {
    color: #FFF;
    background: #396EFE;
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-bottom .cad-setting-dialog-button-save:hover {
    color: #F2F2F2;
    background: #305DD7;
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-bottom .cad-setting-dialog-button-cancel {
    margin-right: 18px;
    color: #000;
    background: #F2F2F2;
}

.cad-setting-dialog-wrapper .cad-setting-dialog-main .cad-setting-dialog-bottom .cad-setting-dialog-button-cancel:hover {
    color: #396EFE;
    background: #E9E9E9;
}

.cad-setting-window-input-card-wrapper {
    display: flex;
    height: 72px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 12px;
    margin-bottom: 12px;
    background-color: #FFF;
}

.cad-setting-window-input-card-wrapper .input-card-left-part {
    display: inline-flex;
    color: #33353B;
    font-size: 14px;
    flex-direction: column;
    align-self: center;
}

.cad-setting-window-input-card-wrapper .input-card-left-part .input-card-title {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
}

.cad-setting-window-input-card-wrapper .input-card-left-part .input-card-title .input-card-title-main {
    display: inline-flex;
    font-size: 14px;
    color: #33353B;
    font-weight: bold;
}

.cad-setting-window-input-card-wrapper .input-card-right-part {
    position: relative;
    display: inline-flex;
    font-size: 12px;
    justify-content: flex-end;
    align-items: center;
}

.cad-setting-window-input-card-wrapper .input-card-right-part .input-card-input-item {
    width: 90px !important;
}

.cad-setting-window-input-card-wrapper .input-card-right-part .input-card-input-invalid-tips {
    position: absolute;
    color: #EB5D46;
    height: 20px;
    font-size: 12px;
    bottom: -25px;
    white-space: nowrap;
}
`;

export default styles;