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
/**
 * Maintains application state.
 */
export declare class AWClient {
    wrapper: Wrapper;
    adapters: Adapter[];
    constructor(wrapper: Wrapper);
    /**
     * Execute the attached adapters
     */
    executeAdapters(): void;
    /**
     * Attaches an adapter
     * @param adapter the adapter to attach
     */
    attachAdapter(adapter: Adapter): void;
    /**
     * Detach an adapter
     * @param uuid the uuid of the adapter to detach
     */
    detachAdapter(uuid: string): void;
    /**
     * Sets the preferences for an adapter
     * @param uuid the uuid of the adapter
     * @param preferences the preferences to set
     */
    setAdapterPreferences(uuid: string, preferences: any): void;
}
