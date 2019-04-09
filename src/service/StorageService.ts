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
 * The type of storage available
 */
export enum StorageType {
	/**
	 * Sync allows for storage of data across devices, such as sharing
	 * between desktop and mobile. Sync is preferred to local storage.
	 */
	SYNC,
	/**
	 * Local storage saves only to this installation of the browser/device.
	 */
	LOCAL
}

/**
 * StorageService describes how to access the storage.
 */
export interface StorageService {
	/**
	 * Sets a key in the store to a given value.
	 * @param key the key to set in the store
	 * @param value the value to set the given entry to
	 * @param type the type of storage, defaults to StorageType.SYNC
	 */
	set(key: string, value: any, type?: StorageType): Promise<any>;

	/**
	 * Fetches the value stored at the given key
	 * @param key the key to retrieve
	 */
	get(key: string, type?: StorageType): Promise<any>;
}
