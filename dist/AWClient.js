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
const AdapterContext_1 = require("./adapter/AdapterContext");
/**
 * Maintains application state.
 */
class AWClient {
    constructor(wrapper) {
        this.adapters = {};
        this.wrapper = wrapper;
    }
    /**
     * Get the adapters
     */
    getAdapters() {
        return this.adapters;
    }
    getAdapterContext(adapter) {
        return new AdapterContext_1.AdapterContext(this.wrapper, adapter);
    }
    /**
     * Attaches an adapter
     * @param adapter the adapter to attach
     */
    attachAdapter(adapter) {
        return new Promise((resolve, reject) => {
            if (this.adapters[adapter.uuid] != undefined) {
                reject(new Error('An adapter with the UUID ' + adapter.uuid + ' is already attached.'));
            }
            else {
                this.adapters[adapter.uuid] = adapter;
                resolve();
            }
        });
    }
    /**
     * Detach an adapter
     * @param uuid the uuid of the adapter to detach
     */
    detachAdapter(uuid) {
        delete this.adapters[uuid];
    }
    /**
     * Sets the preferences for an adapter
     * @param uuid the uuid of the adapter
     * @param preferences the preferences to set
     */
    setAdapterPreferences(uuid, preferences) {
        this.wrapper.storage.set(uuid + '/preferences', preferences);
    }
}
exports.AWClient = AWClient;
//# sourceMappingURL=AWClient.js.map