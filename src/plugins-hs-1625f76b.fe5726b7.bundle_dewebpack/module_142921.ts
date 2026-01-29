const cssContent = `
.loadingIcon {
    display: block;
    text-align: center;
    background: transparent;
}

.loadingIcon.hidden {
    display: none;
}

.loadingIcon.center {
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 40px / 2);
    width: 40px;
    height: 40px;
}

.loadingIcon img {
    width: inherit;
    height: inherit;
}
`;

export default cssContent;