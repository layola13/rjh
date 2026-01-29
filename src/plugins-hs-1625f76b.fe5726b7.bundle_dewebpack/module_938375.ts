const styles = `.product-thumbnail {
    width: 444px;
    height: 565px;
    margin: 116px 0px 0px 515px;
    background: #ffffff;
    position: relative;
    z-index: 100;
    border-radius: 8px;
    background-clip: padding-box;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.product-thumbnail .product-thumbnail-head {
    width: 100%;
    height: 60px;
    background: transparent;
}
.product-thumbnail .product-thumbnail-head .product-thumbnail-title {
    margin: 20px 0px 0px 18px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    display: inline-block;
}
.product-thumbnail .product-thumbnail-head .product-thumbnail-close {
    margin: 22px 20px 0px 0px;
    height: 12px;
    width: 12px;
    float: right;
}
.product-thumbnail .product-thumbnail-content {
    margin: auto;
    width: 416px;
    height: 445px;
    border: 1px dotted;
    overflow: auto;
}
.product-thumbnail .product-thumbnail-content .product-thumbnail-img {
    min-width: 100%;
    height: auto;
    max-width: unset;
    max-height: unset;
}
.product-thumbnail .product-thumbnail-bottom {
    width: 100%;
    height: 60px;
}
.product-thumbnail .product-thumbnail-bottom .product-thumbnail-buttom {
    width: 88px;
    height: 32px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #dcdce1;
    background: #327dff;
    margin: 14px 20px auto;
    color: #ffffff;
    float: right;
    text-align: center;
}`;

export default styles;