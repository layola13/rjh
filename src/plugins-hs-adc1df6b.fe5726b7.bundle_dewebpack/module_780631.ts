const cssContent = `.rotate-align-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.rotate-align-container .rotate-align-label {
    color: #888888;
    font-size: 12px;
}
.rotate-align-container .rotate-value-label {
    margin-left: 60px;
}
.rotate-align-container .rotate-image-button-icon {
    width: 37px;
    height: 37px;
    font-size: 18px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #300213;
}
.rotate-align-container .rotate-image-button-icon:hover {
    background: rgba(51, 53, 59, 0.06);
}
.rotate-align-container .rotate-image-button-icon::before {
    content: '';
    position: absolute;
    left: 0;
    top: 11px;
    width: 1px;
    height: 20px;
    background-color: #D4D7E1;
}
.rotate-align-container__large {
    height: 72px;
}
.rotate-align-container__large .rotate-align {
    height: 64px;
    width: 64px;
    margin-right: 0px;
}`;

export default cssContent;