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
    init() {
        return this.wrapper.storage.get('adapters').then((adapters) => {
            this.adapters = adapters || {};
        });
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
            if (this.adapters[adapter.uuid] != undefined && this.adapters[adapter.uuid].version === adapter.version) {
                reject(new Error(`An adapter with the UUID ${adapter.uuid} (version ${adapter.version}) is already attached.`));
            }
            else {
                this.adapters[adapter.uuid] = adapter;
                this.wrapper.storage.set('adapters', this.adapters);
                // Set this adapter's default preferences
                let preferences = {};
                for (let key in Object.keys(adapter.preferenceSchema)) {
                    preferences[key] = adapter.preferenceSchema[key].default;
                }
                this.setAdapterPreferences(adapter.uuid, preferences);
                resolve(this.adapters);
            }
        });
    }
    /**
     * Detach an adapter
     * @param uuid the uuid of the adapter to detach
     */
    detachAdapter(uuid) {
        delete this.adapters[uuid];
        this.wrapper.storage.set('adapters', this.adapters);
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