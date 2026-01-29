const cssContent = `.guide-global {
    font-family: 'AlibabaPuHuiTi-Bold' !important;
}

.guide-global .guideTip .tooltipContainer {
    left: -25px;
}

.guide-global .guideTip {
    position: absolute;
    top: 3px;
    left: 127px;
    z-index: 5000;
    font-size: 12px;
}

.guide-global .guideTip .content .content-text {
    font-weight: bold;
    float: left;
    font-size: 18px;
    color: #fff;
    padding: 15px 12px;
    background: #396efe;
    border-radius: 8px;
    font-family: 'AlibabaPuHuiTi-Bold' !important;
}

.guide-global .guideTip .content .content-text .guideTipCloseBtn {
    display: inline-block;
    margin-left: 10px;
    margin-bottom: -2px;
}

.guide-global .guideTip .content .iconArrow {
    width: 0;
    height: 0;
    border-width: 7px;
    border-style: solid;
    position: absolute;
    border-color: #396efe;
}

.guide-global .guideTip .content .left {
    border-color: transparent #396efe transparent transparent;
    top: 16px;
    left: -14px;
}

.guide-global .guideTip .content .right {
    border-color: transparent transparent transparent #396efe;
    top: 16px;
    left: calc(100%);
}

.guide-global .guideTip .content .top {
    border-color: transparent transparent #396efe transparent;
    top: -14px;
    left: calc(50% - 6px);
}

.guide-global .guideTip .content .bottom {
    border-color: #396efe transparent transparent transparent;
    top: 48px;
    left: calc(50% - 6px);
}

.guide-global .guideTip .content .noarrow {
    border: none;
    top: 0;
    left: 0;
}

@keyframes bounce {
    from {
        top: -100px;
    }
    10%, 90% {
        top: 40px;
    }
    to {
        top: -100px;
    }
}

.guide-global .bounce {
    animation-name: bounce;
    transform-origin: center bottom;
    animation-duration: 5s;
    animation-fill-mode: both;
}

@keyframes bounceleft {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(10px, 0, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}

.guide-global .bounceleft {
    animation-name: bounceleft;
    transform-origin: center bottom;
}

@keyframes bounceright {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(-10px, 0, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}

.guide-global .bounceright {
    animation-name: bounceright;
    transform-origin: center bottom;
}

@keyframes bouncetop {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(0, 10px, 0);
    }
    100% {
        transform: translate3d(0, 0px, 0);
    }
}

.guide-global .bouncetop {
    animation-name: bouncetop;
    transform-origin: center bottom;
}

@keyframes bouncebottom {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(0, -10px, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}

.guide-global .bouncebottom {
    animation-name: bouncebottom;
    transform-origin: center bottom;
}

.guide-global .animated,
.guide-global .guideanimated {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
}`;

export default cssContent;