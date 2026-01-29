const styles = `.ballon-tip-wrapper {
    max-width: 280px;
    position: relative;
    width: -moz-max-content;
    width: max-content;
    border-radius: 8px;
    overflow: hidden;
}
.ballon-tip-wrapper .ballon-tip-content {
    padding: 12px;
}
.ballon-tip-wrapper .ballon-tip-content .ballon-tip-word {
    margin-right: 18px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    font-family: 'AlibabaPuHuiTi-Bold' !important;
}
.ballon-tip-wrapper .ballon-tip-content .ballon-tip-word * {
    font-family: 'AlibabaPuHuiTi-Bold' !important;
}
.ballon-tip-wrapper .ballon-tip-content .ballon-tip-word:hover {
    text-decoration: underline;
}
.ballon-tip-wrapper .ballon-tip-content .ballon-tip-close {
    position: absolute;
    right: 10px;
    top: 14px;
    cursor: pointer;
}
.ballon-tip-wrapper .ballon-tip-content .ballon-not-remind {
    margin-top: 12px;
}
.ballon-tip-wrapper.teaching-light {
    background-color: #1c1c1c;
    color: #fff;
}
.ballon-tip-wrapper.teaching-light .ballon-tip-close {
    color: rgba(255, 255, 255, 0.8);
}
.ballon-tip-wrapper.teaching-black {
    background-color: #fff;
    color: #000;
}
.ballon-tip-wrapper.teaching-black .ballon-tip-close {
    color: #000;
}
.ballon-tips-arrow.teaching-light {
    color: #1c1c1c !important;
}
.ballon-tips-arrow.teaching-black {
    color: #fff !important;
}`;

export default styles;