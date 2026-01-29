const styles = `.full-screen-loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.5);
}
.full-screen-loading-mask .full-screen-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}`;

export default styles;