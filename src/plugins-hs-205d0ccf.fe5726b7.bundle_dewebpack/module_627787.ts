export const styles = `
.goto-teaching {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 24px;
}

.goto-teaching .goto-teaching-split {
    width: 14px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    overflow: hidden;
    padding-left: 14px;
}

.goto-teaching .goto-teaching-title {
    padding-right: 6px;
    font-family: 'AlibabaPuHuiTi-Bold' !important;
    transition: all 0.2s linear;
}

.goto-teaching .goto-teaching-icon {
    width: 16px;
    height: 16px;
    border-radius: 16px;
    overflow: hidden;
    font-size: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s linear;
}

.goto-teaching.teaching-light .goto-teaching-split {
    color: #60646f;
    background-image: linear-gradient(to right, rgba(245, 245, 245, 0.1), #f5f5f5 60%, #f5f5f5 100%);
}

.goto-teaching.teaching-light .goto-teaching-title {
    color: #33353b;
    background-color: #f5f5f5;
}

.goto-teaching.teaching-light .goto-teaching-icon {
    background-color: #000000;
    color: #fff;
}

.goto-teaching.teaching-black .goto-teaching-split {
    color: #cccccd;
    background-image: linear-gradient(to right, rgba(67, 68, 71, 0.1), #434447 60%, #434447 100%);
}

.goto-teaching.teaching-black .goto-teaching-title {
    color: #fff;
    background-color: #434447;
}

.goto-teaching.teaching-black .goto-teaching-icon {
    background-color: #fff;
    color: #2b2c2e;
}

.goto-teaching:hover .goto-teaching-title {
    color: #396efe;
}

.goto-teaching:hover .goto-teaching-icon {
    background-color: #396efe;
}
`;

export default styles;