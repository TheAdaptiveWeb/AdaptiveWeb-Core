"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Contains options for an XHR request
 */
class XHROptions {
    constructor(options = {}) {
        /**
         * The HTTP method to use. Allowed values are GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS.
         *
         * Defaults to GET.
         */
        this.method = 'GET';
        /**
         * Whether to send cookies to 3rd party domains. Defaults to false.
         */
        this.withCredentials = false;
        /**
         * The method used to serialize data. Defaults to JSON.stringify.
         */
        this.serialize = JSON.stringify;
        /**
         * The method used to deserialize data. Defaults to JSON.parse.
         */
        this.deserialize = JSON.parse;
        this.method = options.method || 'GET';
        this.data = options.data || {};
        this.async = options.async || true;
        this.user = options.user;
        this.password = options.password;
        this.withCredentials = options.withCredentials || false;
        this.timeout = options.timeout;
        this.serialize = options.serialize || JSON.stringify;
        this.deserialize = options.deserialize || JSON.parse;
        this.headers = options.headers || {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json, text/*'
        };
    }
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
    encodeUrlParameters(url) {
        Object.keys(this.data).forEach((key) => {
            if (url.indexOf(':' + key) >= 0) {
                let regex = new RegExp(':' + key, 'g');
                url = url.replace(regex, this.data[key]);
            }
        });
        return url;
    }
}
exports.XHROptions = XHROptions;
//# sourceMappingURL=XHRService.js.map