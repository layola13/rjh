/**
 * HTTP POST request utility module
 * 
 * This module provides a wrapper function for making POST requests
 * by utilizing a base HTTP request function with the method pre-configured.
 */

import { HttpRequestFunction, HttpResponse } from './http-types';

/**
 * Makes an HTTP POST request
 * 
 * @template T - The expected response data type
 * @param url - The URL to send the POST request to
 * @param data - The data payload to send in the request body
 * @returns A promise that resolves to the HTTP response
 * 
 * @example
 *