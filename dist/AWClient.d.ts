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
export declare class AWClient {
    private wrapper;
    private adapters;
    constructor(wrapper: Wrapper);
    init(): Promise<any>;
    /**
     * Saves global options (used by the configuration site and interacting with awcli)
     * @param newOptions the options to save
     */
    setGlobalOptions(newOptions: any): Promise<any>;
    /**
     * Fetch the global options.
     */
    getGlobalOptions(): Promise<any>;
    /**
     * Get the adapters
     */
    getAdapters(): {
        [id: string]: Adapter;
    };
    /**
     * Returns a new AdapterContext.
     * @param adapter the adapter to generate an AdapterContext for
     */
    getAdapterContext(adapter: Adapter): AdapterContext;
    /**
     * Attaches an adapter
     * @param adapter the adapter to attach
     */
    attachAdapter(adapter: Adapter, replace?: boolean): Promise<any>;
    /**
     * Detach an adapter
     * @param id the id of the adapter to detach
     */
    detachAdapter(id: string): void;
    /**
     * Sets the preferences for an adapter
     * @param id the id of the adapter
     * @param preferences the preferences to set
     */
    setAdapterPreferences(id: string, preferences: any): void;
}
