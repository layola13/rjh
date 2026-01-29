const styles = `
.upload-cloud {
    box-sizing: border-box;
    padding: 26px 0;
    border: 1px solid #33353b;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s linear;
    cursor: pointer;
}

.upload-cloud:hover {
    background-color: #dee0e6;
}

.upload-cloud .icon {
    width: 80px;
    height: 80px;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 2px;
    flex-shrink: 0;
}

.upload-cloud .upload-file-type {
    font-size: 16px;
    color: #33353b;
    font-weight: bold;
    margin-top: 20px;
}

.upload-cloud .upload-file-desc {
    font-size: 12px;
    color: #60646f;
    font-weight: 300;
    margin-top: 10px;
    line-height: 16px;
}

.upload-cloud .upload-file-input {
    display: none;
}
`;

export default styles;