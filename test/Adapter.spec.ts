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
import { Adapter, Wrapper, AdapterContext } from '../src/main';
import { getGenericWrapper } from './helper';

describe('Adapter spec', () => {

    let adapterObj: any, wrapper: Wrapper;

    before(() => {
        adapterObj = {
            uuid: '0855cbc4-fa58-4d1b-a206-b07338f365d7',
            name: 'TestAdapter',
            description: 'testAdapter_description',
            version: '1.0.0',
            script: '',
            preferenceSchema: {}
        }

        wrapper = getGenericWrapper();
    });

    it('should initiate from object', () => {
        let adapter = Adapter.fromObject(adapterObj);
        expect(adapter.uuid).to.be.string(adapterObj.uuid);
        expect(adapter.name).to.be.string(adapterObj.name);
        expect(adapter.description).to.be.string(adapterObj.description);
        expect(adapter.version).to.be.string(adapterObj.version);
        expect(adapter.preferenceSchema).to.deep.equal(adapterObj.preferenceSchema);
    });

    it('should initiate from string', () => {
        let adapter = Adapter.fromObject(JSON.stringify(adapterObj));
        expect(adapter.uuid).to.be.string(adapterObj.uuid);
        expect(adapter.name).to.be.string(adapterObj.name);
        expect(adapter.description).to.be.string(adapterObj.description);
        expect(adapter.version).to.be.string(adapterObj.version);
        expect(adapter.preferenceSchema).to.deep.equal(adapterObj.preferenceSchema);
    });

    it('should be able to execute adapter', () => {
        // Consider better unit testing for eval
        let adapter = new Adapter(adapterObj.uuid,
                                  adapterObj.name,
                                  adapterObj.description,
                                  adapterObj.version,
                                  adapterObj.script,
                                  adapterObj.preferenceSchema);
        adapter.execute(new AdapterContext(wrapper, adapter));
    });

});