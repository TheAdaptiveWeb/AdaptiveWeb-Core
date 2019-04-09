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
import { StorageService, XHRService, DOMService } from '../service';
/**
 * A wrapper is a device/browser implementation of the service
 * implementations provided by the core platform.
 */
export declare abstract class Wrapper {
    /**
     * The name of this platform/browser. Used for reporting.
     */
    abstract name: string;
    /**
     * The version of this wrapper
     */
    abstract version: string;
    /**
     * The storage service
     */
    abstract storage: StorageService;
    /**
     * The XHR service
     */
    abstract xhr: XHRService;
    /**
     * The DOM service
     */
    abstract dom: DOMService;
}
