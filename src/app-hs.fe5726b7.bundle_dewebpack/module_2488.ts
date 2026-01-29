import request from './module_9597';

export default function post<T = any>(url: string, data?: any): Promise<T> {
  return request<T>(url, data, 'post');
}