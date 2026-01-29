const styles = `.guideTip {
    font-size: 12px;
}
.guideTip .content .content-text {
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    padding: 15px 12px;
    background: #396efe;
    border-radius: 8px;
    font-family: 'AlibabaPuHuiTi-Bold' !important;
    width: -moz-max-content;
    width: max-content;
    max-width: 380px;
    white-space: pre-line;
}
.guideTip .content .content-text .guideTipCloseBtn {
    display: inline-block;
    margin-left: 10px;
    margin-bottom: -2px;
}
.guideTip .content .iconArrow {
    width: 0;
    height: 0;
    border-width: 7px;
    border-style: solid;
    position: absolute;
    border-color: #396efe;
}
.guideTip .content .right {
    border-color: transparent #396efe transparent transparent;
    top: 50%;
    transform: translateY(-50%);
    left: -14px;
}
.guideTip .content .left {
    border-color: transparent transparent transparent #396efe;
    top: 50%;
    transform: translateY(-50%);
    left: calc(100%);
}
.guideTip .content .bottom {
    border-color: transparent transparent #396efe transparent;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
}
.guideTip .content .top {
    border-color: #396efe transparent transparent transparent;
    top: 48px;
    left: 50%;
    transform: translateX(-50%);
}
.guideTip .content .noarrow {
    border: none;
    top: 0;
    left: 0;
}
@keyframes bounce-y {
    0% {
        transform: translate3d(-50%, 0, 0);
    }
    50% {
        transform: translate3d(-50%, -10px, 0);
    }
    100% {
        transform: translate3d(-50%, 0, 0);
    }
}
@keyframes bounce-x {
    0% {
        transform: translate3d(0, -50%, 0);
    }
    50% {
        transform: translate3d(10px, -50%, 0);
    }
    100% {
        transform: translate3d(0, -50%, 0);
    }
}
.guide-tooltip {
    position: absolute;
    box-shadow: 6px 6px 30px 0px rgba(0, 0, 0, 0.3);
    animation-duration: 1s;
    animation-iteration-count: infinite;
}
.guide-tooltip.left {
    top: 50%;
    right: calc(100% + 18px);
    transform: translateY(-50%);
    animation-name: bounce-x;
}
.guide-tooltip.right {
    top: 50%;
    left: calc(100% + 18px);
    transform: translateY(-50%);
    animation-name: bounce-x;
}
.guide-tooltip.top {
    left: 50%;
    bottom: calc(100% + 18px);
    transform: translateX(-50%);
    animation-name: bounce-y;
}
.guide-tooltip.bottom {
    left: 50%;
    top: calc(100% + 18px);
    transform: translateX(-50%);
    animation-name: bounce-y;
}`;

export default styles;