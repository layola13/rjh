const cssContent = `.beginner-iframe-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5000;
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.beginner-iframe-wrapper.mini {
    background-color: rgba(0, 0, 0, 0.6);
}
.beginner-iframe-wrapper.mini .beginner-iframe {
    width: 900px;
    height: 600px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
}
.beginner-iframe-wrapper .beginner-loading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.beginner-iframe-wrapper .beginner-iframe {
    width: 100%;
    height: 100%;
}`;

export default cssContent;