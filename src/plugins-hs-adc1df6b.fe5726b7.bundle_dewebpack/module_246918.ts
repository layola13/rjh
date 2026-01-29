const styles = `
.camera-view-popup {
    position: fixed;
    background-color: #ffffff;
    box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);
    border-radius: 4px;
    z-index: 100;
    justify-content: center;
    align-items: center;
}

.camera-view-popup .ant-btn :hover {
    background-color: #fff;
    border-color: #fff;
    color: #327dfe;
}

.camera-view-popup .ant-btn :focus {
    color: black;
    background-color: #fff;
    border-color: #fff;
}

.camera-view-popup .ant-btn-primary {
    color: black;
    background-color: #fff;
    border-color: #fff;
    font-size: 12px;
    font-weight: 300;
}

.camera-view-popup .ant-btn-primary:hover,
.camera-view-popup .ant-btn-primary:focus {
    color: #327dfe;
    background-color: #fff;
    border-color: #fff;
}
`;

export default styles;