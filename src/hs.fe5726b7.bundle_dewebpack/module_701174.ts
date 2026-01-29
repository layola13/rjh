function addParam(url: string, paramName: string, paramValue: string | number): string {
    let result = url;
    if (url.includes("?")) {
        result += "&";
    } else {
        result += "?";
    }
    result += `${paramName}=${paramValue}`;
    return result;
}

function addParams(url: string, params: Record<string, string | number>): string {
    let result = url;
    Object.entries(params).forEach(([key, value]) => {
        result = addParam(result, key, value);
    });
    return result;
}

function clearParams(url: string): string {
    const queryIndex = url.indexOf("?");
    return queryIndex === -1 ? url : url.substr(0, queryIndex);
}

function isDataUrl(url: string): boolean {
    return !!url && url.startsWith("data:");
}

function addTimestamp(url: string): string {
    return addParam(url, "timestamp", Date.now());
}

function getFormatTime(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

export {
    addParam,
    addParams,
    clearParams,
    isDataUrl,
    addTimestamp,
    getFormatTime
};