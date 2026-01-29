const styles = `
.hsw-expandbtn {
    cursor: pointer;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 28px;
}

.hsw-expandbtn svg {
    width: 15px;
    height: 15px;
}

.hsw-expandbtn svg .selected {
    display: none !important;
}

.hsw-expandbtn svg .normal {
    display: block !important;
}

.hsw-expandbtn.expand svg .selected {
    display: block !important;
}

.hsw-expandbtn.expand svg .normal {
    display: none !important;
}
`;

export default styles;