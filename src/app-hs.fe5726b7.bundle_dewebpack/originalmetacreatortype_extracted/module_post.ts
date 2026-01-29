const post = <T = any>(url: string, data?: any, config?: any): Promise<T> => {
  return e.post<T>(url, data, config);
};

export default post;