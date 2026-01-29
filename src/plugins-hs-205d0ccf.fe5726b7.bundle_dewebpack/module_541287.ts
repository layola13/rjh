const styles = `.card-tips-wrapper {
    width: 310px;
    padding: 8px;
    box-sizing: border-box;
}
.card-tips-wrapper .card-tips-top {
    height: 18px;
    display: flex;
    align-items: center;
    margin-top: 4px;
    margin-bottom: 10px;
    margin-left: 10px;
    position: relative;
}
.card-tips-wrapper .card-tips-top .card-tips-title {
    font-family: AlibabaPuHuiTi-Bold !important;
    font-size: 16px;
    line-height: 18px;
    margin-right: 80px;
    overflow: hidden;
    height: 18px;
}
.card-tips-wrapper .card-tips-top .card-tips-title * {
    font-family: AlibabaPuHuiTi-Bold !important;
}
.card-tips-wrapper .card-tips-top .top-close {
    width: 20px;
    height: 20px;
    position: absolute;
    font-size: 12px;
    right: 0px;
    top: 50%;
    transform: translate(0, -50%);
}
.card-tips-wrapper .card-tips-top .top-close .round-icon {
    font-size: 12px;
    height: 20px;
}
.card-tips-wrapper .card-tips-top .card-tips-not-remind {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 40px;
}
.card-tips-wrapper .card-tips-word {
    position: relative;
    padding: 10px;
    border-radius: 8px;
}
.card-tips-wrapper .card-tips-word .card-tips-word-introduction {
    font-family: PingFangSC-Regular !important;
    font-size: 12px;
    height: 80px;
    line-height: 20px;
    word-wrap: break-word;
    overflow: hidden;
}
.card-tips-wrapper .card-tips-word .goto-wrapper {
    position: absolute;
    right: 10px;
    bottom: 10px;
    line-height: 20px;
}
.card-tips-wrapper.teaching-light .card-tips-word {
    background-color: #f5f5f5;
}
.card-tips-wrapper.teaching-light .card-tips-word-introduction {
    color: #60646f;
}
.card-tips-wrapper.teaching-light .card-tips-title {
    color: #33353b;
}
.card-tips-wrapper.teaching-black .card-tips-word {
    background-color: #434447;
}
.card-tips-wrapper.teaching-black .card-tips-word-introduction {
    color: #cccccd;
}
.card-tips-wrapper.teaching-black .card-tips-title {
    color: #fff;
}`;

export default styles;