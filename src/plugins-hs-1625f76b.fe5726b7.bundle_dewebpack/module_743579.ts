const cssContent = `.loading-icon {
    background: transparent;
    width: 40px;
    height: 40px;
}
.loading-icon.show-loading-icon {
    display: inline-flex;
}
.loading-icon.hide-loading-icon {
    display: none;
}
@keyframes rotateit {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}`;

export default cssContent;