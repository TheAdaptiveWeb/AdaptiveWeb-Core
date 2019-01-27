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
    private adapters: { [uuid: string]:  Adapter } = {};

    constructor(wrapper: Wrapper) {
        this.wrapper = wrapper;
    }

    /**
     * Get the adapters
     */
    getAdapters() {
        return this.adapters;
    }

    getAdapterContext(adapter: Adapter) {
        return new AdapterContext(this.wrapper, adapter);
    }

    /**
     * Attaches an adapter
     * @param adapter the adapter to attach
     */
    attachAdapter(adapter: Adapter): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.adapters[adapter.uuid] != undefined) {
                reject(new Error('An adapter with the UUID ' + adapter.uuid + ' is already attached.'));
            } else {
                this.adapters[adapter.uuid] = adapter;
                resolve();
            }
        })
    }

    /**
     * Detach an adapter
     * @param uuid the uuid of the adapter to detach
     */
    detachAdapter(uuid: string) {
        delete this.adapters[uuid];
    }

    /**
     * Sets the preferences for an adapter
     * @param uuid the uuid of the adapter
     * @param preferences the preferences to set
     */
    setAdapterPreferences(uuid: string, preferences: any) {
        this.wrapper.storage.set(uuid + '/preferences', preferences);
    }

}