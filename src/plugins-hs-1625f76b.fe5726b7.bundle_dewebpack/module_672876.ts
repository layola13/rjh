const compassWidgetStyles = `
.compasswidget {
    position: absolute;
}

.compasswidget .compasspercentage {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 80px;
    height: 80px;
}

.compasswidget .compasspercentage > svg {
    position: absolute;
    top: 0;
    left: 0;
}

.compasswidget #compass {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 80px;
    height: 80px;
    z-index: 1;
}

.compasswidget #compass .dragarea.ui-draggable {
    width: 100%;
    height: 100%;
    position: static !important;
}

.compasswidget #compass .dragarea.ui-draggable > .hover-icon-bg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.compasswidget .compassdegree {
    padding: 5px;
    position: absolute;
    left: 80px;
    top: 10px;
    width: 54px;
    height: 14px;
    background: rgba(0, 0, 0, 0.7);
    color: #FFFFFF;
    border-radius: 12px 12px 12px 0;
    text-align: center;
}

.compasswidget .compassdegree .anglediv {
    width: 20px;
    height: 20px;
    float: left;
    position: relative;
    top: -1px;
    left: 1px;
}

.compasswidget .compassdegree .clear {
    clear: both;
}
`;

export default compassWidgetStyles;