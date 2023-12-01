import getConfig from 'next/config';

import { userService } from '@/services/user.service';

const { publicRuntimeConfig } = getConfig();


interface FetchWrapper {
  get: (url: string) => Promise<any>;
  post: (url: string, body?: any) => Promise<any>;
  put: (url: string, body?: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
}

export const fetchWrapper: FetchWrapper = {
  get: (url) => request('GET', url),
  post: (url, body) => request('POST', url, body),
  put: (url, body) => request('PUT', url, body),
  delete: (url) => request('DELETE', url),
};

async function request(method: string, url: string, body?: any): Promise<any> {
  const requestOptions: RequestInit = {
    method,
    headers: authHeader(url) as HeadersInit, // No need for the nullish coalescing operator here
  };

  if (body) {
    const headers = requestOptions.headers as Record<string, string>; // Cast to Record<string, string>
    headers['Content-Type'] = 'application/json';
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// helper functions

function authHeader(url: string): Record<string, string> {
  // return auth header with jwt if the user is logged in and the request is to the API URL
  const user = userService.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);

  // Always return a valid object
  return isLoggedIn && isApiUrl ? { Authorization: `Bearer ${user!.token}` } : {};
}

async function handleResponse(response: Response): Promise<any> {
  const isJson = response.headers?.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  // check for error response
  if (!response.ok) {
    if ([401, 403].includes(response.status) && userService.userValue) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from API
      userService.logout();
    }

    // get the error message from the body or default to the response status
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data as any;
}
