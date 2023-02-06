interface FetchReturn<T> {
  status: number;
  data: T;
  ok: boolean;
  error: string;
}

class ApiFetch {
  globalHeaders: Record<string, any>;

  constructor(headers: Record<string, any> = {}) {
    this.globalHeaders = headers;
  }

  get = <T>(
    url: string,
    headers: Record<string, any> = {}
  ): Promise<FetchReturn<T>> => this.apiFetch({ url, method: 'GET', headers });

  post = <T>(url: string, data: Record<string, any>): Promise<FetchReturn<T>> =>
    this.apiFetch({ url, method: 'POST', body: data });

  put = <T>(url: string, data: Record<string, any>): Promise<FetchReturn<T>> =>
    this.apiFetch({ url, method: 'PUT', body: data });

  delete = <T>(url: string): Promise<FetchReturn<T>> =>
    this.apiFetch({ url, method: 'DELETE' });

  private apiFetch = <T>({
    url,
    method,
    headers = {},
    body = {},
  }: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, any>;
    body?: Record<string, any> | FormData;
  }): Promise<FetchReturn<T>> =>
    new Promise((resolve, reject) => {
      fetch(url, {
        method,
        ...(method === 'POST' || method === 'PUT'
          ? {
              body:
                typeof FormData !== 'undefined' && body instanceof FormData
                  ? body
                  : JSON.stringify(body),
            }
          : {}),
        headers: {
          ...this.globalHeaders,
          ...headers,
          ...(typeof FormData !== 'undefined' && body instanceof FormData
            ? {}
            : { 'Content-Type': 'application/json' }),
        },
      })
        .then((resp) => Promise.all([resp, resp.json()]))
        .then(([resp, data]) => {
          const ok = resp.status < 300;
          resolve({
            status: resp.status,
            data,
            ok,
            error: ok
              ? ''
              : typeof data === 'string'
              ? data
              : data?.message
              ? data.message
              : 'An unexpected error occurred',
          });
        })
        .catch((e) => {
          resolve({
            status: 0,
            data: null,
            ok: false,
            error: 'An unexpected error occurred',
          });
        });
    });
}

export default ApiFetch;
