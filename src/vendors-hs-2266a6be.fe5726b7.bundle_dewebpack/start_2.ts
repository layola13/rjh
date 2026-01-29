/**
 * Base number system converter
 */
class BaseConverter {
    private srcAlphabet: string;
    private dstAlphabet: string;

    constructor(sourceAlphabet: string, destinationAlphabet: string) {
        if (!sourceAlphabet || !destinationAlphabet || !sourceAlphabet.length || !destinationAlphabet.length) {
            throw new Error("Bad alphabet");
        }
        this.srcAlphabet = sourceAlphabet;
        this.dstAlphabet = destinationAlphabet;
    }

    convert(input: string | number[]): string | number[] {
        const sourceBase = this.srcAlphabet.length;
        const destBase = this.dstAlphabet.length;
        const inputLength = input.length;
        const isString = typeof input === "string";
        let result: string | number[] = isString ? "" : [];

        if (!this.isValid(input)) {
            throw new Error(`Number "${input}" contains of non-alphabetic digits (${this.srcAlphabet})`);
        }

        if (this.srcAlphabet === this.dstAlphabet) {
            return input;
        }

        const digits: Record<number, number> = {};
        for (let i = 0; i < inputLength; i++) {
            digits[i] = this.srcAlphabet.indexOf(input[i]);
        }

        let size = inputLength;
        do {
            let remainder = 0;
            let newSize = 0;
            
            for (let i = 0; i < size; i++) {
                const value = remainder * sourceBase + digits[i];
                if (value >= destBase) {
                    digits[newSize++] = parseInt(String(value / destBase), 10);
                    remainder = value % destBase;
                } else if (newSize > 0) {
                    digits[newSize++] = 0;
                }
            }
            
            size = newSize;
            result = this.dstAlphabet.slice(remainder, remainder + 1).concat(result);
        } while (size !== 0);

        return result;
    }

    isValid(input: string | number[]): boolean {
        for (let i = 0; i < input.length; ++i) {
            if (this.srcAlphabet.indexOf(input[i]) === -1) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Default configuration constants
 */
const DEFAULT_CONFIG = {
    freeTimeThreshold: 120000, // 2 minutes
    customizedName: "customizedInfo",
    sendingQueueSize: 250,
    maxSendTimeThreshold: 300000 // 5 minutes
};

/**
 * Logger name enumeration
 */
enum LoggerName {
    UserTrackLogger = "userTrackLogger",
    ErrorLogger = "errorLogger",
    MtopApiLogger = "mtopApiLogger",
    PerformanceLogger = "performanceLogger"
}

/**
 * Event emitter base class
 */
class EventEmitter {
    private events: Record<string, Function[]> = {};

    on(eventName: string, handler: Function): void {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(handler);
    }

    emit(eventName: string, ...args: unknown[]): void {
        if (this.events[eventName]) {
            this.events[eventName].forEach(handler => {
                handler.call(this, ...args);
            });
        }
    }

    once(eventName: string, handler: Function): void {
        const wrappedHandler = (...args: unknown[]) => {
            handler.call(this, ...args);
            this.off(eventName, wrappedHandler);
        };
        this.on(eventName, wrappedHandler);
    }

    off(eventName: string, handler: Function): void {
        if (this.events[eventName]) {
            const index = this.events[eventName].indexOf(handler);
            if (index !== -1) {
                this.events[eventName].splice(index, 1);
            }
        }
    }
}

/**
 * Create base converter instance
 */
function createConverter(sourceAlphabet: string, destAlphabet: string): (value: string) => string {
    const converter = new BaseConverter(sourceAlphabet, destAlphabet);
    return (value: string) => converter.convert(value) as string;
}

// Predefined alphabets
const BINARY = "01";
const OCTAL = "01234567";
const DECIMAL = "0123456789";
const HEXADECIMAL = "0123456789abcdef";

export { 
    BaseConverter, 
    createConverter, 
    DEFAULT_CONFIG, 
    LoggerName, 
    EventEmitter,
    BINARY,
    OCTAL,
    DECIMAL,
    HEXADECIMAL
};