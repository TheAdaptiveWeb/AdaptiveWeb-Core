/**
 *  Copyright 2019 The Adaptive Web. All Rights Reserved.
 * 
 *  Licensed under the Mozilla Public License 2.0 (the "License"). 
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *  
 *      https://www.mozilla.org/en-US/MPL/2.0/
 *  
 *  or in the "license" file accompanying this file. This file is distributed 
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 *  express or implied. See the License for the specific language governing 
 *  permissions and limitations under the License.
 */

/**
 * Makes XHR (aka AJAX) requests and returns a promise.
 */
export interface XHRService {

    /**
     * Sends a XHR (AJAX) request and returns a promise.
     * @param url the url to send the request to. Can contain interpolations.
     * @param options The options of the request.
     */
   request(url: string, options: XHROptions): Promise<any>;

}

/**
 * Contains options for an XHR request
 */
export class XHROptions {

    /**
     * The HTTP method to use. Allowed values are GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS.
     * 
     * Defaults to GET.
     */
    method: string = 'GET';
    /**
     * Data to be serialized into the querystring (for GET requests) or body for other methods.
     */
    [data: string]: any;
    /**
     * Whether the request should be sent asynchronously. Defaults to true.
     */
    async?: boolean = true;
    /**
     * The username for HTTP authorization.
     */
    user?: string;
    /**
     * The password for HTTP authorization.
     */
    password?: string;
    /**
     * Whether to send cookies to 3rd party domains. Defaults to false.
     */
    withCredentials?: boolean = false;
    /**
     * The amount of milliseconds a request can take before automatically being terminated.
     */
    timeout?: number;
    /**
     * The method used to serialize data. Defaults to JSON.stringify.
     */
    serialize: Function = JSON.stringify;
    /**
     * The method used to deserialize data. Defaults to JSON.parse.
     */
    deserialize: Function = JSON.parse;

    /**
     * Encodes url parameters based on the data set.
     * 
     * For example, given the url "/profile/:id", and data set to
     * { id: '123' }, this function will return "/profile/123".
     * 
     * If the data is a string, it will be encoded directly, or if
     * the 
     * @param url the url to encode
     */
    encodeUrlParameters(url: string): string {
        Object.keys(this.data).forEach((key: string) => {
            if (url.indexOf(':' + key) >= 0) {
                let regex: RegExp = new RegExp(':' + key, 'g');
                if (typeof this.data[key] === 'string') {
                    url = url.replace(regex, this.data[key]);
                } else {
                    url = url.replace(regex, this.serialize(this.data[key]));
                }
            }
        });
        return url;
    }

}