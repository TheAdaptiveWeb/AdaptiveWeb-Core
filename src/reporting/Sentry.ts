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
 * Sentry is used for error reporting. For more info, see https://sentry.io
 */
import { init } from '@sentry/browser';

init({
    dsn: 'https://f1f8d7c57bf5460185c988e12cf4dd41@sentry.io/1380565',
});

// TODO: Add context tagging