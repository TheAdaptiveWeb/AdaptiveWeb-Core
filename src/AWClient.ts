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

import { Wrapper } from "./wrapper";
import { Adapter } from "./adapter/Adapter";
import { AdapterContext } from './adapter/AdapterContext';

/**
 * Maintains application state.
 */
export class AWClient {

    private wrapper: Wrapper;
    private adapters: { [id: string]:  Adapter } = {};
    private _initiated: boolean = false;
    
    constructor(wrapper: Wrapper) {
        this.wrapper = wrapper;   
    }

    init(): Promise<any> {
        return this.wrapper.storage.get('adapters').then((adapters: any) => {
            this.adapters = adapters || {};
            this._initiated = true;
            return this.adapters;
        });
    }

    get initiated(): boolean {
        return this._initiated;
    }

    /**
     * Saves global options (used by the configuration site and interacting with awcli)
     * @param newOptions the options to save
     */
    setGlobalOptions(newOptions: any): Promise<any> {
        return this.wrapper.storage.set('globalOptions', newOptions);
    }

    /**
     * Fetch the global options.
     */
    getGlobalOptions(): Promise<any> {
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
    getAdapterContext(adapter: Adapter) {
        return new AdapterContext(this.wrapper, adapter);
    }

    /**
     * Attaches an adapter
     * @param adapter the adapter to attach
     */
    attachAdapter(adapter: Adapter, replace: boolean = false): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.adapters[adapter.id] != undefined && this.adapters[adapter.id].version === adapter.version && !replace) {
                reject(`An adapter with the ID ${adapter.id} (version ${adapter.version}) is already attached.`);
            } else {
                this.adapters[adapter.id] = adapter;
                this.wrapper.storage.set('adapters', this.adapters);

                // Set this adapter's default preferences
                let preferences: any = {};
                Object.keys(adapter.preferenceSchema).forEach(key => {
                    preferences[key] = adapter.preferenceSchema[key].default;
                });
                this.setAdapterPreferences(adapter.id, preferences);
                resolve(this.adapters);
                return;
            }
        })
    }

    /**
     * Detach an adapter
     * @param id the id of the adapter to detach
     */
    detachAdapter(id: string) {
        delete this.adapters[id];
        this.wrapper.storage.set('adapters', this.adapters);
    }

    /**
     * Sets the preferences for an adapter
     * @param id the id of the adapter
     * @param preferences the preferences to set
     */
    setAdapterPreferences(id: string, preferences: any) {
        this.wrapper.storage.set(id + '/preferences', preferences);
    }

    /**
     * Updates the preferences of an adapter by providing a subset of preference values
     * @param id the id of the adapter
     * @param preferences a subset of the adapter preferences to update
     */
    updateAdapterPreferences(id: string, preferences: any) {
        this.wrapper.storage.get(id + '/preferences').then((prevPrefs: any) => {
            Object.keys(prevPrefs).forEach(key => {
                if (preferences[key] !== undefined && prevPrefs[key] !== preferences[key]) {
                    prevPrefs[key] = preferences[key];
                }
            });
            this.setAdapterPreferences(id, prevPrefs);
        });
    }

    /**
     * Get the current preferences of an adapter by its id.
     * @param id the id of the adapter
     */
    getAdapterPreferences(id: string) {
        return this.wrapper.storage.get(id + '/preferences');
    }

}