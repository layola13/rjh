const styles = `
.rightpropertybar .pocket_top {
    margin-top: 9px;
}
.rightpropertybar .pocket_bottom {
    margin-top: 9px;
}
.rightpropertybar .pocket_middle {
    margin-top: 5px;
}
.rightpropertybar .pocket_secondRowHdivider {
    margin-top: 10px;
}
.rightpropertybar .pocket_secondRowVdivider {
    margin-right: 5px;
}
.rightpropertybar .applyBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 228px;
    height: 30px;
    text-align: center;
    border: 1px solid #dcdce1;
    border-radius: 2px;
    cursor: pointer;
    background-color: #FFFFFF;
    transition: background-color 0.1s;
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
    background-color: #327DFF;
    font-weight: bold;
    color: #fff;
}
.rightpropertybar .applyBtn:hover .imgRightLabel {
    color: #55acee;
}
.rightpropertybar .applyBtn:hover .svgWrapper svg .hover {
    display: block !important;
}
.rightpropertybar .applyBtn:hover .svgWrapper svg .normal {
    display: none;
}
`;

export default styles;