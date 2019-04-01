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
 * Adapter Context exposes a limited interface for adapters
 */
class AdapterContext {
    constructor(wrapper, adapter) {
        this.wrapper = wrapper;
        this.adapter = adapter;
    }
    /**
      * Sends a XHR (AJAX) request and returns it as a promise.
      * @param url the url to send the request to. Can contain interpolations.
      * @param options The options of the request.
      */
    request(url, options) {
        return this.wrapper.xhr.request(url, options);
    }
    /**
     * Returns the preferences of this adapter
     */
    getPreferences() {
        return this.wrapper.storage.get(this.adapter.id + '/preferences');
    }
    get ui() {
        return this.wrapper.dom;
    }
}
exports.AdapterContext = AdapterContext;
//# sourceMappingURL=AdapterContext.js.map