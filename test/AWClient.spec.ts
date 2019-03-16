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
import { Wrapper, AWClient, Adapter } from '../src/main';
import { getGenericWrapper, generateAdapter } from './helper';

describe('AWClient tests', () => {

    let wrapper: Wrapper, awClient: AWClient;

    beforeEach(() => {
        wrapper = getGenericWrapper();
        awClient = new AWClient(wrapper);
        return awClient.init();
    });

    it('should return list of adapters', () => {
        expect(awClient.getAdapters()).to.deep.equal({});
    });

    it('should return the context for an adapter', () => {
        let adapter: Adapter = generateAdapter('id1');
        expect(awClient.getAdapterContext(adapter)).to.not.be.undefined;
    });

    it('should attach an adapter', () => {
        let adapter: Adapter = generateAdapter('id1');
        return awClient.attachAdapter(adapter).then(({}) => {
            expect(awClient.getAdapters()['id1']).to.not.be.undefined;
        });
    });

    it('should not attach duplicate adapter', (done) => {
        let adapter: Adapter = generateAdapter('id1');
        awClient.attachAdapter(adapter).then((response: any) => {
            awClient.attachAdapter(adapter).then(() => {}, (error: any) => {
                done();
            });
        });
    });

    it('should remove attached adapter with detachAdapter', () => {
        let adapter: Adapter = generateAdapter('id1');
        return awClient.attachAdapter(adapter).then((response: any) => {
            awClient.detachAdapter(adapter.id);
            expect(awClient.getAdapters()).to.deep.equal({});
        });
    });

    it('should save adapter preferences', (done) => {
        let adapter: Adapter = generateAdapter('id1');
        awClient.attachAdapter(adapter).then((response: any) => {
            awClient.setAdapterPreferences(adapter.id, {});
            wrapper.storage.get('id1/preferences').then((res: any) => {
                expect(res).to.not.be.undefined;
                done();
            });
        });
    });

    it('should set default adapter preferences', (done) => {
        let adapter: Adapter = generateAdapter('id1');
        adapter.preferenceSchema = {
            key: {
                type: "text",
                friendlyName: "Adapter key",
                description: "Adapter preference description",
                default: "value"
            },
            key2: {
                type: "text",
                friendlyName: "Adapter key 2",
                description: "Adapter preference description 2",
                default: "value2"
            }
        };

        awClient.attachAdapter(adapter).then((response: any) => {
            let ctx = awClient.getAdapterContext(adapter);
            ctx.getPreferences().then(res => {
                expect(res['key']).to.equal('value');
                expect(res['key2']).to.equal('value2');
                done();
            });
        })
    })

    it('should save global options', (done) => {
        awClient.setGlobalOptions({ optionKey: 'optionValue' }).then(res => {
            done();
        });
    });

    it('should load global options', (done) => {
        awClient.setGlobalOptions({ optionKey: 'optionValue' }).then(() => {
            awClient.getGlobalOptions().then(res => {
                expect(res).to.deep.equal({ optionKey: 'optionValue' });
                done();
            });
        });
    })

});