import r from './module_379081';

export default function post<T = unknown>(url: string, data?: unknown): Promise<T> {
    return r<T>(url, data, 'post');
}