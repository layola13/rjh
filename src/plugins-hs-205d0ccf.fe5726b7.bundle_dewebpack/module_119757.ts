const styles = `
.image-modal-wrapper {
    width: 500px;
    padding: 12px 18px 12px 18px;
    box-sizing: border-box;
}

.image-modal-wrapper .image-modal-top {
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
}

.image-modal-wrapper .image-modal-top .image-modal-title {
    font-family: AlibabaPuHuiTi-Bold !important;
    font-size: 18px;
    transform: skew(-12deg);
}

.image-modal-wrapper .image-modal-top .image-modal-xing-wrapper {
    display: flex;
    align-items: center;
    margin: 8px;
}

.image-modal-wrapper .image-modal-top .top-close {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translate(0, -50%);
}

.image-modal-wrapper .one-item-wrapper {
    padding-bottom: 6px;
}

.image-modal-wrapper .image-modal-item {
    padding-bottom: 16px;
    border-radius: 8px;
    overflow: hidden;
}

.image-modal-wrapper .image-modal-item .image-modal-player {
    width: 462px;
    height: 260px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #cecece;
}

.image-modal-wrapper .image-modal-item .image-modal-player .pic-render {
    width: 100%;
    height: 100%;
}

.image-modal-wrapper .image-modal-item .image-modal-word {
    position: relative;
    margin: 14px 14px 0 14px;
}

.image-modal-wrapper .image-modal-item .image-modal-word .image-modal-word-title {
    height: 24px;
    line-height: 24px;
    margin-bottom: 7px;
    font-size: 16px;
    font-family: 'AlibabaPuHuiTi-Bold' !important;
}

.image-modal-wrapper .image-modal-item .image-modal-word .image-modal-word-introduction {
    font-family: PingFangSC-Regular !important;
    font-size: 14px;
    height: 72px;
    line-height: 24px;
    word-wrap: break-word;
    overflow: hidden;
}

.image-modal-wrapper .image-modal-item .image-modal-word .goto-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 24px;
}

.image-modal-wrapper.teaching-light .image-modal-item {
    background-color: #f5f5f5;
}

.image-modal-wrapper.teaching-light .image-modal-title {
    color: #33353b;
}

.image-modal-wrapper.teaching-light .image-modal-word-title {
    color: #33353b;
}

.image-modal-wrapper.teaching-light .image-modal-word-introduction {
    color: #60646f;
}

.image-modal-wrapper.teaching-black .image-modal-item {
    background-color: #434447;
}

.image-modal-wrapper.teaching-black .image-modal-title {
    color: #fff;
}

.image-modal-wrapper.teaching-black .image-modal-word-title {
    color: #fff;
}

.image-modal-wrapper.teaching-black .image-modal-word-introduction {
    color: #BEBFC0;
}
`;

export default styles;