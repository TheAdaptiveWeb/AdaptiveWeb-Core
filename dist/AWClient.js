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
        this._initiated = false;
        this.wrapper = wrapper;
    }
    init() {
        return this.wrapper.storage.get('adapters').then((adapters) => {
            this.adapters = adapters || {};
            this._initiated = true;
        });
    }
    get initiated() {
        return this._initiated;
    }
    /**
     * Saves global options (used by the configuration site and interacting with awcli)
     * @param newOptions the options to save
     */
    setGlobalOptions(newOptions) {
        return this.wrapper.storage.set('globalOptions', newOptions);
    }
    /**
     * Fetch the global options.
     */
    getGlobalOptions() {
        return this.wrapper.storage.get('globalOptions');
    }
    /**
     * Get the adapters
     */
    getAdapters() {
        return this.adapters;
    }
    /**
     * Returns a new AdapterContext.
     * @param adapter the adapter to generate an AdapterContext for
     */
    getAdapterContext(adapter) {
        return new AdapterContext_1.AdapterContext(this.wrapper, adapter);
    }
    /**
     * Attaches an adapter
     * @param adapter the adapter to attach
     */
    attachAdapter(adapter, replace = false) {
        return new Promise((resolve, reject) => {
            if (this.adapters[adapter.id] != undefined && this.adapters[adapter.id].version === adapter.version && !replace) {
                reject(`An adapter with the ID ${adapter.id} (version ${adapter.version}) is already attached.`);
            }
            else {
                this.adapters[adapter.id] = adapter;
                this.wrapper.storage.set('adapters', this.adapters);
                // Set this adapter's default preferences
                let preferences = {};
                Object.keys(adapter.preferenceSchema).forEach(key => {
                    preferences[key] = adapter.preferenceSchema[key].default;
                });
                this.setAdapterPreferences(adapter.id, preferences);
                resolve(this.adapters);
                return;
            }
        });
    }
    /**
     * Detach an adapter
     * @param id the id of the adapter to detach
     */
    detachAdapter(id) {
        delete this.adapters[id];
        this.wrapper.storage.set('adapters', this.adapters);
    }
    /**
     * Sets the preferences for an adapter
     * @param id the id of the adapter
     * @param preferences the preferences to set
     */
    setAdapterPreferences(id, preferences) {
        this.wrapper.storage.set(id + '/preferences', preferences);
    }
}
exports.AWClient = AWClient;
//# sourceMappingURL=AWClient.js.map