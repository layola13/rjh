const CRASH_THRESHOLD = 60000;
const HEARTBEAT_CHECK_INTERVAL = 2000;
const CRASH_DETECTION_WINDOW = 900000;
const MIN_LOGS_FOR_CRASH_DETECTION = 6;
const UUID_HEX_SEGMENT_SIZE = 65536;

interface PageState {
    isCrash: boolean;
    visible: boolean;
    isLoad: boolean;
    t: number;
}

interface CustomizedInfo {
    description: string;
    group: string;
    duration: number;
    pages: Record<string, PageState>;
    designId?: string;
    publishVersion?: string;
    publishVersionByType?: string;
    activeEnvironmentName?: string;
    viewModeName?: string;
    beforeUserTracks?: UserTrackLog[];
    libraryId?: string;
    packageId?: string;
    caseId?: string;
    subCaseId?: string;
}

interface UserTrackLog {
    actionType: string;
    currentTime: number;
    logName: string;
    traceId: string;
    pageId: string;
    customizedInfo?: Partial<CustomizedInfo>;
    linkUserTraceId?: string;
    lastTraceId?: string;
}

interface MessageData {
    type: 'heartbeat' | 'unload' | 'hidden' | 'visible' | string;
    id: string;
    logServer?: string;
    userTrackLogs?: UserTrackLog[];
}

interface FetchOptionsConfig {
    contentType?: string | boolean;
    headers?: Record<string, string | boolean>;
}

interface PostTrackData {
    data: {
        items: UserTrackLog[];
        type: string;
    };
}

const pages: Record<string, PageState> = {};
const crashTraceIdsByPageId = new Map<string, string>();
const useTrackLogsByPageId = new Map<string, UserTrackLog[]>();

let logServer: string | undefined;
let swInterval: ReturnType<typeof setInterval> | null = null;

function getUUID(): string {
    function generateSegment(): string {
        return ((UUID_HEX_SEGMENT_SIZE * (1 + Math.random())) | 0)
            .toString(16)
            .substring(1);
    }
    return `${generateSegment()}${generateSegment()}-${generateSegment()}-${generateSegment()}-${generateSegment()}-${generateSegment()}${generateSegment()}${generateSegment()}`;
}

function processData(data: unknown, options: FetchOptionsConfig): string | unknown {
    const { contentType } = options;
    if (contentType === false || (contentType && !contentType.includes('application/json')) || typeof data === 'string') {
        return data;
    }
    return JSON.stringify(data);
}

function toFetchOptions(
    config: FetchOptionsConfig | undefined,
    body: unknown,
    url: string
): RequestInit {
    const options: FetchOptionsConfig = {
        contentType: 'application/json',
        ...config
    };

    const fetchInit: RequestInit = {
        headers: {
            Accept: 'application/json',
            'Content-Type': options.contentType as string,
            ...(options.headers as Record<string, string>)
        },
        compress: true
    } as RequestInit;

    if (!url) {
        fetchInit.mode = 'cors';
        fetchInit.credentials = 'include';
    }

    if (body) {
        fetchInit.body = processData(body, options) as BodyInit;
    }

    return fetchInit;
}

function ajax<T = unknown>(url: string, options: RequestInit): Promise<T> {
    return fetch(url, options).then((response) => response.json());
}

function post<T = unknown>(
    url: string,
    body: unknown,
    config?: FetchOptionsConfig
): Promise<T> {
    return ajax<T>(
        url,
        Object.assign(toFetchOptions(config, body, url), {
            method: 'POST'
        })
    );
}

function selfConsole(..._args: unknown[]): void {}

function sendUserTrackLog(pageId: string, isCrash: boolean, duration?: number): void {
    if (!logServer) {
        return;
    }

    const traceId = crashTraceIdsByPageId.get(pageId);
    const userTrackLogs = useTrackLogsByPageId.get(pageId);
    const description = isCrash
        ? '工具崩溃了!'
        : '工具没有崩溃，这条日志为了判断工具是否真的崩溃了';

    let trackLog: UserTrackLog = {
        actionType: isCrash ? 'crashError' : 'fakeCrashError',
        currentTime: Date.now(),
        logName: 'errorLogger',
        traceId: isCrash ? (traceId ?? getUUID()) : getUUID(),
        pageId,
        customizedInfo: {
            description,
            group: 'crashError',
            duration: duration ?? 0,
            pages
        }
    };

    if (!isCrash) {
        trackLog.lastTraceId = traceId;
    }

    if (Array.isArray(userTrackLogs) && userTrackLogs.length > 0) {
        const lastLog = userTrackLogs[userTrackLogs.length - 1];
        const lastCustomInfo = lastLog?.customizedInfo ?? {};

        trackLog = {
            ...lastLog,
            ...trackLog,
            linkUserTraceId: lastLog.traceId ?? '',
            customizedInfo: {
                description,
                designId: lastCustomInfo.designId,
                publishVersion: lastCustomInfo.publishVersion,
                publishVersionByType: lastCustomInfo.publishVersionByType,
                activeEnvironmentName: lastCustomInfo.activeEnvironmentName,
                viewModeName: lastCustomInfo.viewModeName,
                group: 'crashError',
                beforeUserTracks: userTrackLogs,
                duration: duration ?? 0,
                pages
            }
        };

        if (lastCustomInfo.caseId) {
            Object.assign(trackLog.customizedInfo, {
                libraryId: lastCustomInfo.libraryId,
                packageId: lastCustomInfo.packageId,
                caseId: lastCustomInfo.caseId,
                subCaseId: lastCustomInfo.subCaseId
            });
        }
    }

    post<void>(
        `${logServer}/api/rest/v1.0/user/track`,
        {
            data: {
                items: [trackLog],
                type: 'error'
            }
        } as PostTrackData,
        {
            headers: {
                'Access-Control-Allow-Credentials': true as unknown as string
            }
        }
    );
}

function checkCrashDebounce(pageId: string): void {
    const pageState = pages[pageId];
    if (!pageState) {
        return;
    }

    const userTrackLogs = useTrackLogsByPageId.get(pageId);
    if (!userTrackLogs || !Array.isArray(userTrackLogs)) {
        return;
    }

    const currentTime = Date.now();
    const logsCount = userTrackLogs.length;

    if (logsCount > MIN_LOGS_FOR_CRASH_DETECTION) {
        const lastLogTime = userTrackLogs[logsCount - 1].currentTime;
        const timeSinceLastUpdate = currentTime - pageState.t;

        if (
            lastLogTime + CRASH_DETECTION_WINDOW > currentTime &&
            timeSinceLastUpdate > CRASH_THRESHOLD &&
            pageState.isLoad &&
            !pageState.isCrash
        ) {
            pageState.isCrash = true;
            pageState.t = currentTime;
            selfConsole('crash-heartbeat', pages);
            crashTraceIdsByPageId.set(pageId, getUUID());
            sendUserTrackLog(pageId, true, timeSinceLastUpdate);
        }
    }
}

function serviceWorkTimer(): void {
    swInterval = setInterval(() => {
        for (const pageId in pages) {
            checkCrashDebounce(pageId);
        }
    }, HEARTBEAT_CHECK_INTERVAL);
}

self.addEventListener('message', (event: ExtendableMessageEvent) => {
    if (!swInterval) {
        serviceWorkTimer();
    }

    const messageData = event.data as MessageData;
    let pageId = messageData.id;

    if (messageData.type === 'heartbeat') {
        logServer = messageData.logServer;
        if (messageData.userTrackLogs) {
            useTrackLogsByPageId.set(pageId, messageData.userTrackLogs);
        }

        if (pages[pageId]) {
            pages[pageId] = {
                ...pages[pageId],
                t: Date.now()
            };
        } else {
            pages[pageId] = {
                isCrash: false,
                visible: true,
                isLoad: true,
                t: Date.now()
            };
        }

        selfConsole('heartbeat', pages);

        if (pages[pageId].isCrash) {
            sendUserTrackLog(pageId, false);
            pages[pageId].isCrash = false;
            selfConsole('fake-crash-heartbeat', pages);
            crashTraceIdsByPageId.delete(pageId);
        }
    } else if (messageData.type === 'unload') {
        if (pages[pageId]) {
            pages[pageId] = {
                ...pages[pageId],
                isLoad: false,
                t: Date.now()
            };
        } else {
            pages[pageId] = {
                isCrash: false,
                visible: true,
                isLoad: false,
                t: Date.now()
            };
        }

        selfConsole('unload', pages);
        useTrackLogsByPageId.delete(pageId);
        crashTraceIdsByPageId.delete(pageId);
    } else if (messageData.type === 'hidden') {
        if (pages[pageId]) {
            pages[pageId] = {
                ...pages[pageId],
                visible: false,
                t: Date.now()
            };
        } else {
            pages[pageId] = {
                isCrash: false,
                visible: false,
                isLoad: true,
                t: Date.now()
            };
        }

        selfConsole('hidden', pages);
    } else if (messageData.type === 'visible') {
        if (pages[pageId]) {
            pages[pageId] = {
                ...pages[pageId],
                visible: true,
                t: Date.now()
            };
        } else {
            pages[pageId] = {
                isCrash: false,
                visible: true,
                isLoad: true,
                t: Date.now()
            };
        }

        selfConsole('visible', pages);
    } else {
        pageId = pageId || 'pageId_not_found';

        if (pages[pageId]) {
            pages[pageId] = {
                ...pages[pageId],
                isLoad: true,
                t: Date.now()
            };
        } else {
            pages[pageId] = {
                isCrash: false,
                visible: true,
                isLoad: true,
                t: Date.now()
            };
        }
    }
});

self.addEventListener('install', () => {
    selfConsole('installing');
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    selfConsole('activating');
    self.clients.claim();
});