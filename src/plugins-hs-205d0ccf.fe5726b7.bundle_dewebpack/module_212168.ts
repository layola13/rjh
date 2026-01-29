const styles = `.underlayimg-pop-title {
    width: 100%;
    height: 20px;
    position: absolute;
}
.underlayimg-pop-img {
    position: absolute;
    left: 50%;
    top: calc(50%);
    overflow: hidden;
    -o-object-fit: contain;
    object-fit: contain;
    transform: translate(-50%, -50%);
}
.underlayimg-pop-img > img {
    -webkit-user-drag: none;
}
.underlayimg-pop-icon {
    position: absolute;
    right: 17px;
    top: 10px;
    z-index: 1;
}`;

export default styles;