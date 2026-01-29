const styles = `
.SliderContainer {
    float: left;
    width: 136px;
}

.SliderContainer .Slider {
    width: 86%;
    margin: 12px 0 0 9px;
    float: left;
}

.rangeLine {
    background: #94c1e8;
    width: 0%;
    height: 2px;
    position: absolute;
    top: 0px;
    left: 0px;
}

.SliderContainer .dimension {
    float: left;
    width: 106%;
    font-size: 12px;
    color: #ccc;
    margin-left: -2px;
}

.SliderContainer .dimension span {
    margin: 0;
    padding: 0;
}

.SliderContainer .dimension span.d1 {
    float: left;
}

.SliderContainer .dimension span.d2 {
    float: left;
    position: relative;
    left: 30px;
}

.SliderContainer .dimension span.d3 {
    float: right;
}

.SliderContainer .Slider a.ui-slider-handle {
    top: -0.15em;
    margin-left: -0.35em;
    width: 12px;
    height: 12px;
    border-radius: 24px;
    -moz-border-radius: 24px;
    -webkit-border-radius: 24px;
}
`;

export default styles;