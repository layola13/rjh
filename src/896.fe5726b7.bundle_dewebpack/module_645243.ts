const styles = `
.float-button {
    display: flex;
    height: 30px;
    align-items: center;
    max-width: 30px;
    overflow: hidden;
    transition: all 0.3s ease;
    border-radius: 30px;
    color: #fff;
    cursor: pointer;
}

.float-button:hover {
    max-width: 500px;
}

.float-button.expand {
    max-width: 500px;
}

.float-button .icon {
    height: 20px;
    width: 20px;
    margin-left: 5px;
    flex: none;
    cursor: move;
}

.float-button .text {
    margin-left: 5px;
    font-family: AlibabaPuHuiTi-Bold;
    font-size: 12px;
    line-height: 16px;
    flex: none;
}

.float-button .right-icon {
    margin-left: 14px;
    margin-right: 8px;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
}
`;

export default styles;