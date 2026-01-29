const styles = `.rightpropertybar .openDoors {
    margin-top: 9px;
}
.rightpropertybar .openButton {
    border: 1px solid #c3c3c3;
    display: inline-block;
    width: 60px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    border-radius: 2px;
    margin: 8px 3px 8px 3px;
}
.rightpropertybar .applyBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 228px;
    text-align: center;
    border: 1px solid #c3c3c3;
    border-radius: 2px;
    cursor: pointer;
}
.rightpropertybar .applyBtn .imgRightLabel {
    margin-left: 4px;
    font-size: 12px;
    color: #808080;
}
.rightpropertybar .applyBtn .svgIconContainer {
    width: 16px;
    height: 16px;
}
.rightpropertybar .applyBtn .svgWrapper svg {
    width: 16px;
    height: 16px;
}
.rightpropertybar .applyBtn:hover {
    border-radius: 2px;
}
.rightpropertybar .applyBtn:hover .imgRightLabel {
    color: #55acee;
}
.rightpropertybar .applyBtn:hover .svgWrapper svg .hover {
    display: block !important;
}
.rightpropertybar .applyBtn:hover .svgWrapper svg .normal {
    display: none;
}`;

export default styles;