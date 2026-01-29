const styles = `
.float-input-container {
    position: fixed;
    padding: 10px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 0px 16px 0px rgba(25, 25, 50, 0.25);
    z-index: 1005;
}

.float-input-container .length-input-wrapper {
    margin-left: 10px;
}

.float-input-container .length-input-wrapper:first-child {
    margin-left: 0px;
}

.float-input-container.hide {
    display: none;
}
`;

export default styles;