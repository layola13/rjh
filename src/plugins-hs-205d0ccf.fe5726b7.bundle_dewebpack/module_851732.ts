const styles = `
.spark_pic_switch-view-container {
    position: absolute;
    left: 288px;
    bottom: 27px;
    height: 30px;
    border-radius: 15px;
    background: #2B2C2E;
    opacity: 0.6;
    padding: 0 15px;
    display: flex;
    align-items: center;
    pointer-events: all;
}

.spark_pic_switch-view-container .switch-item {
    color: white;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
}

.spark_pic_switch-view-container .switch-item:hover {
    color: #396efe;
}

.spark_pic_switch-view-container .switch-3d {
    margin-left: 18px;
}

.spark_pic_switch-view-container .switch-active {
    color: #396efe;
    font-weight: bold;
}
`;

export default styles;