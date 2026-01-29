const GUID_REGEX = /\b[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}\b/i;

const padHex = (value: string): string => {
    return value !== null && value !== "" && value !== "undefined" && value.length === 2
        ? "00" + value
        : value;
};

export const String = {
    matchGUID(input: string): string | undefined {
        if (!input) return;
        const match = GUID_REGEX.exec(input);
        return match?.[0];
    },

    randomGUID(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char: string): string => {
            const random = (Math.random() * 16) | 0;
            const value = char === "x" ? random : (random & 3) | 8;
            return value.toString(16);
        });
    },

    getDateTimeString(date?: Date): string {
        return (date || new Date()).toISOString();
    },

    getShortPinyin(input: string): string {
        let index = -1;
        if (!String.prototype.localeCompare) {
            throw new Error("String.prototype.localeCompare not supported.");
        }

        const length = input.length;
        const result = new Array<string>(length);
        const pinyinMarkers = "驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳";
        const pinyinLetters = "ABCDEFGHJKLMNOPQRSTWXYZ";

        for (let i = 0; i < length; i++) {
            const char = input.charAt(i);
            if (/[^\u4e00-\u9fa5]/.test(char)) {
                result[i] = char;
            } else {
                for (let j = 0; j < 23; j++) {
                    if (pinyinMarkers[j].localeCompare(char, "zh-CN-u-co-pinyin") >= 0) {
                        index = j;
                        break;
                    }
                }
                result[i] = pinyinLetters[index];
            }
        }
        return result.join("");
    },

    format(template: string, ...args: unknown[]): string {
        const params = args[0] instanceof Array ? [0, ...args[0]] : [0, ...args];
        
        if (template && typeof template === "string" && params.length - 1) {
            template = template.replace(/\{(\d+)\}/g, (match: string, indexStr: string): string => {
                const index = parseInt(indexStr, 10) + 1;
                return params[index] == null ? "" : String(params[index]);
            });
        }
        return template || "";
    },

    toAscii(input: string): string {
        let result = "";
        for (let i = 0; i < input.length; i++) {
            result += "&#x" + padHex(input.charCodeAt(i).toString(16)) + ";";
        }
        return result;
    },

    toUnicode(input: string, useBackslash: boolean = true): string {
        let result = "";
        for (let i = 0; i < input.length; i++) {
            result += useBackslash
                ? "\\u" + padHex(input.charCodeAt(i).toString(16))
                : "&#" + input.charCodeAt(i) + ";";
        }
        return result;
    },

    unicodeToStr(encoded: string): string {
        let result = encoded;
        
        result = result.replace(/(\\u)(\w{1,4})/gi, (match: string): string => {
            return String.fromCharCode(
                parseInt(escape(match).replace(/(%5Cu)(\w{1,4})/g, "$2"), 16)
            );
        });
        
        result = result.replace(/(&#x)(\w{1,4});/gi, (match: string): string => {
            return String.fromCharCode(
                parseInt(escape(match).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16)
            );
        });
        
        result = result.replace(/(&#)(\d{1,6});/gi, (match: string): string => {
            return String.fromCharCode(
                parseInt(escape(match).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2"))
            );
        });
        
        return result;
    },

    getHashCode(input: string): number {
        let hash = 0;
        if (input.length === 0) return hash;
        
        for (let i = 0; i < input.length; i++) {
            hash = ((hash << 5) - hash) + input.charCodeAt(i);
            hash &= hash;
        }
        return hash;
    }
};