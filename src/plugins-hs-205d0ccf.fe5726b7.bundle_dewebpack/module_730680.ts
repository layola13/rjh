const styles = `
.album-rendering-card .card-label {
    position: absolute;
    width: 100%;
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 77px;
    font-weight: bold;
    top: 0;
    text-align: center;
    z-index: 1;
}

.album-rendering-card .process-info {
    position: absolute;
    bottom: 24px;
    width: calc(100% - 12px);
}

.album-rendering-card .process-info .process-label {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 12px;
}

.album-rendering-card .process-info .ant-progress {
    width: 100%;
    margin: 0 6px;
}

.album-rendering-card .process-info .ant-progress .ant-progress-inner {
    background: rgba(255, 255, 255, 0.1);
}

.album-rendering-card .process-info .ant-progress .ant-progress-inner .ant-progress-bg {
    height: 5px;
    background: rgba(255, 255, 255, 0.8);
}
`;

export default styles;