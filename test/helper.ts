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

import { Adapter, Wrapper, XHRService, XHROptions, StorageService } from "../src/main";

/**
 * Generate an empty Adapter with an optional uuid
 * @param uuid the uuid of the adapter
 */
export function generateAdapter(uuid: string = 'uuid1'): Adapter {
    return new Adapter(uuid, '', '', '', '');
}

/**
 * Returns a wrapper with an in memory storage service and XHR request that 
 * returns an object containing the input url and options
 */
export function getGenericWrapper(): Wrapper {
    return new (class _ extends Wrapper {
        name = '_';
        xhr = new (class _ implements XHRService {
            request(url: string, options: any = new XHROptions): Promise<any> {
                return new Promise<any>((resolve, reject) => {
                    resolve({url, options});
                });
            }
        })();
        storage = new (class _storage implements StorageService {
            private store?: any = {};

            get(key: any){
                return new Promise<any>((resolve, reject) => {
                    resolve(this.store[key]);
                });
            }

            set(key:string,val:any){return new Promise<any>((resolve, reject) => {
                this.store[key] = val;
                resolve();
            });}
        })();
    })();
}