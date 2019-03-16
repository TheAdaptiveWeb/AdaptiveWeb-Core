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

import { expect } from 'chai';
import 'mocha';
import { Wrapper, AdapterContext, Adapter } from '../src/main';
import { getGenericWrapper, generateAdapter } from './helper';

describe('AdapterContext spec', () => {

    let adapterContext: any;

    let wrapper: Wrapper, adapter: Adapter;

    before(() => {
        wrapper = getGenericWrapper();
    });

    beforeEach(() => {
        adapter = generateAdapter();
        adapterContext = new AdapterContext(wrapper, adapter);
    });

    it('should be able to send AJAX requests', (done) => {
        adapterContext.request('url').then((res: any) => {
            expect(res.url == 'url');
            done();
        });
    });

    it('should be able to access preferences', (done) => {
        wrapper.storage.set(adapter.id + '/preferences', {});
        adapterContext.getPreferences().then((res: any) => {
            expect(res).to.not.be.undefined;
            done();
        });
    });

});