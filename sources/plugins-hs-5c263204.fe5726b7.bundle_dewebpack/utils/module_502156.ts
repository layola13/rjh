const cssContent = `.guide-popup-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1111;
}
.guide-popup-mask.hidden {
    display: none;
}
.guide-popup-mask .guide-popup-container {
    background: #FFFFFF;
    box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 900px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.guide-popup-mask .guide-popup-container .top-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 174px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${require('./assets/top-bg.png')});
}
.guide-popup-mask .guide-popup-container .words-container {
    position: absolute;
    top: 105px;
    width: 100%;
    text-align: center;
}
.guide-popup-mask .guide-popup-container .words-container .congratul {
    font-size: 40px;
    font-weight: bold;
    line-height: 40px;
}
.guide-popup-mask .guide-popup-container .words-container .desc {
    font-size: 18px;
    line-height: 21px;
    margin-top: 29px;
}
.guide-popup-mask .guide-popup-container .card-wrapper {
    text-align: center;
    margin-top: 242px;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card {
    display: inline-block;
    width: 360px;
    height: 260px;
    color: black;
    border: 1px solid #1c1c1c;
    border-radius: 16px;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card.second {
    margin-left: 32px;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card:hover {
    background-color: black;
    color: white;
    cursor: pointer;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card:hover .iconfontview {
    display: none !important;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card:hover .iconfontview.hover {
    display: inline-block !important;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card .card-img {
    display: inline-block;
    width: 346px;
    height: 188px;
    margin: 7px 7px 0 7px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card .card-img.home {
    background-image: url(${require('./assets/home-card.png')});
}
.guide-popup-mask .guide-popup-container .card-wrapper .card .card-img.design {
    background-image: url(${require('./assets/design-card.png')});
}
.guide-popup-mask .guide-popup-container .card-wrapper .card .desc-words {
    font-size: 18px;
    font-weight: bold;
    line-height: 64px;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card .desc-words .words {
    font-style: italic;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card .desc-words .iconfontview {
    display: inline-block;
    margin-left: 7px;
    margin-bottom: -4px;
}
.guide-popup-mask .guide-popup-container .card-wrapper .card .desc-words .iconfontview .hover {
    display: none;
}
.guide-popup-mask .guide-popup-container .guanbi-in-guide-popup {
    position: absolute;
    top: 30px;
    right: 40px;
    cursor: pointer;
}`;

export default cssContent;