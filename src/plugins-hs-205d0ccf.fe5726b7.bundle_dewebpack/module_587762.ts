const styles = `.teaching-modal {
    position: absolute;
}
.teaching-modal .drag-title {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 10px;
    z-index: 300;
    cursor: move;
}
.teaching-modal .drag-title .hs-iconfont-view {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.teaching-modal .drag-title .hs-iconfont-view .hover-icon-bg svg {
    width: 20px;
    cursor: move;
}
.teaching-modal .zoom-title {
    display: none;
}
.teaching-modal.teaching-light {
    background-color: #fff;
}
.teaching-modal.teaching-black {
    background-color: #2b2c2e;
    border: 1px solid #3F3F3F;
}`;

export default styles;