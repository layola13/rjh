const styles = `.slider-wrapper {
    position: relative;
}
.slider-wrapper .slider-content {
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}
.slider-wrapper .slider-content .slider-items-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.slider-wrapper .slider-content .slider-items-wrapper .slider-item-wrapper {
    overflow: hidden;
    flex: 0 0 auto;
}
.slider-wrapper:hover .arrow {
    opacity: 1;
}
.slider-wrapper .arrow {
    opacity: 0;
    position: absolute;
    pointer-events: auto;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-repeat: no-repeat;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    top: 40%;
    transform: translate(0, -50%);
    transition: all 0.2s linear;
}
.slider-wrapper .arrow.left-arrow {
    left: -15px;
}
.slider-wrapper .arrow.right-arrow {
    right: -15px;
}
.slider-wrapper .slider-navigation {
    display: flex;
    align-items: center;
    margin-top: 12px;
}
.slider-wrapper .slider-navigation .bar {
    width: 6px;
    height: 6px;
    margin-left: 8px;
    background-color: #b1b1b1;
    border-radius: 3px;
    transition: 0.3s;
}
.slider-wrapper .slider-navigation .bar:first-child {
    margin-left: 0px;
}
.slider-wrapper .slider-navigation .bar:hover {
    background-color: #1c1c1c;
    cursor: pointer;
}
.slider-wrapper .slider-navigation .bar.current {
    width: 20px;
    background-color: #1c1c1c;
}
.slider-wrapper.light .bar {
    background-color: #b1b1b1;
}
.slider-wrapper.light .bar.current {
    background-color: #1c1c1c;
}
.slider-wrapper.light .arrow {
    color: #33353b;
}
.slider-wrapper.light .arrow:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
.slider-wrapper.black .bar.current {
    background-color: #fff;
}
.slider-wrapper.black .arrow {
    color: #fff;
}
.slider-wrapper.black .arrow:hover {
    background-color: rgba(255, 255, 255, 0.3);
}`;

export default styles;