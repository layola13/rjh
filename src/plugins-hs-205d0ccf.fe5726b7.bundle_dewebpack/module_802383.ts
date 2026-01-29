const cssContent = `.failed-card {
    justify-content: flex-start !important;
}
.failed-card .card-label {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-weight: bold;
    top: 0;
    text-align: center;
    z-index: 1;
}
.failed-card .card-label .hs-iconfont-view {
    margin-right: 6px;
    background: #EB5D46;
    border-radius: 10px;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.failed-card .hover-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    opacity: 1;
}`;

export default cssContent;