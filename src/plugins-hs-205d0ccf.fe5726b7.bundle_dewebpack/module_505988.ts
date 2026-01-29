const css = `.pitchLine {
    width: 100%;
    height: 100%;
    position: relative;
}

.pitchLine .line_area {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.pitchLine .line_area .line {
    width: 90px;
    height: 2px;
    margin-top: 0;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.05);
    z-index: 1;
}

.pitchLine .line_area .pitch_base_left,
.pitchLine .line_area .pitch_base_right {
    background-color: #F74C4C;
}

.pitchLine .line_area.pitch_snap .line {
    background-color: #4CF7CD !important;
}

.pitchLine .line_area.line_disable {
    display: none;
}

.line_disable {
    display: none;
}`;

export default css;